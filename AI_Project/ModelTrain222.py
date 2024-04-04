import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from sklearn.preprocessing import MinMaxScaler
from torch.utils.data import DataLoader, TensorDataset
import os

# 데이터 불러오기
df_train = pd.read_csv("C:/users/user/KeepMeSafe/data/user_code_total/train3936.csv")
df_test = pd.read_csv("C:/Users/user/KeepMeSafe/data/user_code_total/test3936.csv")

# 데이터 전처리 함수
def preprocess_data(df):
    df['RegisterDate'] = pd.to_datetime(df['RegisterDate'])
    df.sort_values(by='RegisterDate', inplace=True)
    df.fillna(method='ffill', inplace=True)
    
    features = ['Heartbeat', 'Temperature', 'OutsideTemperature']  # 사용할 특성
    scaler = MinMaxScaler(feature_range=(0, 1))
    df[features] = scaler.fit_transform(df[features])
    
    return df

# 정상 데이터 전처리
df_train_processed = preprocess_data(df_train)
# 테스트 데이터 전처리
df_test_processed = preprocess_data(df_test)

# 다변량 데이터셋 생성 함수
def create_multivariate_dataset(data, features, time_steps=1):
    X = []
    for i in range(len(data) - time_steps):
        X.append(data[features].iloc[i:(i + time_steps)].values)
    return np.array(X)

time_steps = 3
features = ['Heartbeat', 'Temperature', 'OutsideTemperature']

X_train = create_multivariate_dataset(df_train_processed, features, time_steps)
X_test = create_multivariate_dataset(df_test_processed, features, time_steps)

# 텐서로 변환
X_train = torch.Tensor(X_train)
X_test = torch.Tensor(X_test)

# DataLoader 생성
batch_size = 64
train_dataset = TensorDataset(X_train, X_train)
train_loader = DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)

test_dataset = TensorDataset(X_test, X_test)
test_loader = DataLoader(dataset=test_dataset, batch_size=batch_size, shuffle=False)

# 모델 정의
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
        decoded = self.linear(decoded.reshape(-1, x.size(2)))
        return decoded.view(x.size(0), x.size(1), -1)

input_dim = len(features)
hidden_dim = 50
num_layers = 2

model = Autoencoder(input_dim=input_dim, hidden_dim=hidden_dim, num_layers=num_layers)
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# 모델 학습
num_epochs = 20
for epoch in range(num_epochs):
    model.train()
    total_loss = 0
    for inputs, _ in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, inputs)  # 입력과 출력의 차이 계산
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    avg_loss = total_loss / len(train_loader)
    print(f'Epoch {epoch+1}, Loss: {avg_loss}')

# 모델 평가 및 이상치 탐지
def detect_anomalies(loader, model, threshold=0.1):
    anomalies = []
    model.eval()
    with torch.no_grad():
        for i, (inputs, _) in enumerate(loader):
            outputs = model(inputs)
            loss = torch.mean((outputs - inputs) ** 2, dim=1)
            anomaly_idx = torch.where(loss > threshold)[0]
            anomalies.extend(anomaly_idx.cpu().numpy() + i * loader.batch_size)
    return anomalies

threshold = 0.1  # 임계값 설정
anomaly_indices = detect_anomalies(test_loader, model, threshold)

# 이상치 인덱스 탐지 및 결과 출력
print("Anomaly indices:", anomaly_indices)

# 이상치 데이터 추출 및 출력
anomaly_data = df_test_processed.iloc[anomaly_indices]
print(anomaly_data)
