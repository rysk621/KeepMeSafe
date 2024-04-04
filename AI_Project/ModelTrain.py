import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from sklearn.preprocessing import MinMaxScaler
from torch.utils.data import DataLoader, TensorDataset
import json
import os

# 데이터 불러오기 (정상 데이터로 가정)
df_train = pd.read_csv("./data/user_code_total/train3936.csv")
df_test = pd.read_csv("./data/user_code_total/test3936.csv")

# 데이터 전처리 함수
def preprocess_data(df):
    df['RegisterDate'] = pd.to_datetime(df['RegisterDate'])
    df.sort_values(by='RegisterDate', inplace=True)
    df.fillna(method='ffill', inplace=True)
    heartbeat_data = df['Heartbeat'].values.reshape(-1, 1)
    scaler = MinMaxScaler(feature_range=(0, 1))
    heartbeat_data_scaled = scaler.fit_transform(heartbeat_data)
    return heartbeat_data_scaled

# 정상 데이터 전처리
heartbeat_data_scaled_train = preprocess_data(df_train)
# 비정상 데이터 전처리 (평가용)
heartbeat_data_scaled_test = preprocess_data(df_test)

# 데이터셋 생성 함수(변경)
def create_dataset(data, time_steps=1):
    X = []
    for i in range(len(data) - time_steps):
        X.append(data[i:(i + time_steps), 0])
    return np.array(X)

# 모델 정의 (변경 없음)
class Autoencoder(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers):
        super(Autoencoder, self).__init__()
        self.encoder = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
        self.decoder = nn.LSTM(hidden_dim, input_dim, num_layers, batch_first=True)
        self.linear = nn.Linear(input_dim, input_dim)

    def forward(self, x):
        _, (hn, _) = self.encoder(x)
        hn = hn[-1].unsqueeze(0)
        repeated_hn = hn.repeat(1, x.size(1), 1)
        decoded, _ = self.decoder(repeated_hn)
        decoded = self.linear(decoded.view(-1, x.size(2)))
        return decoded.view(x.size(0), x.size(1), -1)

# 데이터셋 생성 (수정된 부분)
time_steps = 3
X_train = create_dataset(heartbeat_data_scaled_train, time_steps)
X_test = create_dataset(heartbeat_data_scaled_test, time_steps)

# 텐서로 변환
X_train = torch.Tensor(X_train).unsqueeze(2)
X_test = torch.Tensor(X_test).unsqueeze(2)

# DataLoader 생성
batch_size = 64
train_dataset = TensorDataset(X_train, X_train)
train_loader = DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)

test_dataset = TensorDataset(X_test, X_test)
test_loader = DataLoader(dataset=test_dataset, batch_size=batch_size, shuffle=False)

# 모델, 손실 함수, 옵티마이저 초기화 및 모델 학습 코드는 기존과 동일하므로 생략합니다.

# 모델, 손실 함수, 옵티마이저 초기화
model = Autoencoder(input_dim=1, hidden_dim=50, num_layers=2)
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# 모델 학습
num_epochs = 20
for epoch in range(num_epochs):
    model.train()
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
    print(f'Epoch {epoch+1}, Loss: {loss.item()}')

# 모델 평가
model.eval()
with torch.no_grad():
    total_loss = 0
    for inputs, labels in test_loader:
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        total_loss += loss.item()
    avg_loss = total_loss / len(test_loader)
    print(f'Test Loss: {avg_loss}')
    

# 이상치 데이터를 선별하고 이를 JSON 형식으로 내보내는 과정



# 모델 평가 및 이상치 탐지
def detect_anomalies(loader, model, threshold=0.1):
    anomalies = []
    model.eval()
    with torch.no_grad():
        for i, (inputs, _) in enumerate(loader):
            outputs = model(inputs)
            loss = torch.mean((outputs - inputs) ** 2, dim=1)
            anomaly_idx = torch.where(loss > threshold)[0]
            anomalies.extend(anomaly_idx + i * loader.batch_size)
    return anomalies

# 이상치 인덱스 탐지
anomaly_indices = detect_anomalies(test_loader, model, threshold=0.1)

# 이상치 데이터 추출
anomaly_data = df_test.iloc[anomaly_indices]

# 이상치 데이터를 JSON 형식으로 저장
anomaly_data_json = anomaly_data.to_json(orient='records')

# JSON 데이터 출력(실제 사용 시 파일로 저장할 수 있음)
print(anomaly_data_json)   

# 필요한 경우 파일로 저장
with open("anomalies.json", "w") as f:
    f.write(anomaly_data_json)

# 모델 저장 로직 추가
# 학습 과정에서 에포크마다 테스트 데이터셋에 대한 평균 손실을 계산하고, 이전에 저장된 모델보다 더 나은 성능을 보이면 모델을 저장하는 방식
# 테스트 데이터셋에 대한 손실이 최소인 모델 -> 저장
import os

# 모델 저장 경로 설정
model_save_path = './best_model.pth'

# 초기 최소 손실 값을 매우 큰 값으로 설정
min_loss = float('inf')

for epoch in range(num_epochs):
    model.train()
    train_loss = 0
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        train_loss += loss.item()
    
    # 에포크마다 평균 훈련 손실 계산
    train_loss = train_loss / len(train_loader)
    
    model.eval()
    test_loss = 0
    with torch.no_grad():
        for inputs, labels in test_loader:
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            test_loss += loss.item()
    
    # 에포크마다 평균 테스트 손실 계산
    test_loss = test_loss / len(test_loader)
    
    print(f'Epoch {epoch+1}, Train Loss: {train_loss}, Test Loss: {test_loss}')
    
    # 현재 모델이 이전 모델보다 성능이 좋으면 저장
    if test_loss < min_loss:
        min_loss = test_loss
        torch.save(model.state_dict(), model_save_path)
        print(f'Model saved at Epoch {epoch+1} with Test Loss: {test_loss}')