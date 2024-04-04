from datetime import datetime
import pytz
import json
import csv
from flask import Flask, request, jsonify
import requests
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from torch.utils.data import DataLoader, TensorDataset



# Autoencoder 클래스 정의 ---------------------------------------------------------------------------------------------------------------
class Autoencoder(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers):
        super(Autoencoder, self).__init__()
        # 인코더 정의: 입력 차원에서 숨겨진 차원으로 매핑하는 LSTM
        self.encoder = nn.LSTM(input_dim, hidden_dim, num_layers, batch_first=True)
        # 디코더 정의: 숨겨진 차원에서 원본 입력 차원으로 매핑하는 LSTM
        self.decoder = nn.LSTM(hidden_dim, input_dim, num_layers, batch_first=True)
        # 최종 출력을 위한 선형 계층
        self.linear = nn.Linear(input_dim, input_dim)

    def forward(self, x):
        # 인코딩: 입력 x를 인코더를 통해 숨겨진 상태 표현으로 변환
        _, (hn, _) = self.encoder(x)
        # 디코딩을 위한 준비: 인코더의 마지막 hidden state를 사용하여 디코더의 입력 준비
        hn = hn[-1].unsqueeze(0)  # 인코더의 마지막 hidden state만 사용
        repeated_hn = hn.repeat(1, x.size(1), 1)  # 디코더 입력을 위해 차원을 맞춤
        # 디코딩: 숨겨진 상태 표현을 원본 입력 차원으로 디코딩
        decoded, _ = self.decoder(repeated_hn)
        decoded = decoded.contiguous().view(-1, x.size(2))  # 선형 계층의 입력 형태로 변환
        # 최종 출력: 선형 계층을 통해 디코딩된 데이터를 최종적으로 변환
        decoded = self.linear(decoded)
        decoded = decoded.view(x.size(0), x.size(1), -1)  # 최종 출력을 원본 데이터와 같은 형태로 변환
        return decoded


@test.route('/sendData', methods=['GET'])
def send_data():
 
# 데이터 전처리 및 모델 클래스 정의는 여기에 포함됩니다.
# 데이터 불러오기 및 전처리
    data = pd.read_csv("./data/user_code_total/dataSaveTest4.csv")    
    df = pd.DataFrame(data)
    
    df['RegisterDate'] = pd.to_datetime(df['RegisterDate'])
    df.sort_values(by='RegisterDate', inplace=True)
    df.fillna(method='ffill', inplace=True)

    heartbeat_data = df['Heartbeat'].values.reshape(-1, 1)
    scaler = MinMaxScaler(feature_range=(0, 1))
    heartbeat_data_scaled = scaler.fit_transform(heartbeat_data)
    
    # 시계열 데이터 변환 함수
    def create_dataset(data, time_steps=1):
        X = []
        for i in range(len(data) - time_steps):
            X.append(data[i:(i + time_steps), 0])
        return np.array(X)
    time_steps = 3
    X = create_dataset(heartbeat_data_scaled, time_steps)
    
    # numpy 배열을 PyTorch 텐서로 변환 및 차원 조정
    X = torch.Tensor(X).unsqueeze(2)
    
    # DataLoader 생성
    batch_size = 16
    dataset = TensorDataset(X, X)
    data_loader = DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True)
    
# 모델 인스턴스 생성
    model = Autoencoder(input_dim=1, hidden_dim=50, num_layers=2)
    criterion = torch.nn.MSELoss()  # 평균 제곱 오차 손실 함수

# 모델을 평가 모드로 설정하고, 재구성 오차를 계산하여 이상치 탐지 기준을 설정합니다.
    model.eval()
    reconstruction_errors = []
    with torch.no_grad():
        for inputs, _ in data_loader:
            outputs = model(inputs)
            loss = criterion(outputs, inputs).item()
        reconstruction_errors.append(loss)

# 이상치 탐지를 위한 임계값을 설정합니다.
    mean_reconstruction_error = np.mean(reconstruction_errors)
    std_reconstruction_error = np.std(reconstruction_errors)
    threshold = mean_reconstruction_error + 2 * std_reconstruction_error

# 재구성 오차를 기반으로 이상치를 식별합니다.
    anomalies = [i for i, error in enumerate(reconstruction_errors) if error > threshold]

# 재구성 오차의 분포를 히스토그램으로 시각화하고, 임계값을 표시합니다.
    plt.hist(reconstruction_errors, bins=50, alpha=0.7, color='blue', label='Reconstruction errors')
    plt.axvline(threshold, color='red', linestyle='dashed', linewidth=2, label='Threshold')
    plt.title('Histogram of Reconstruction Errors')
    plt.xlabel('Reconstruction error')
    plt.ylabel('Frequency')
    plt.legend()
    plt.show()
        
    
    # 이상치로 식별된 샘플 인덱스 (예시)
    anomalies = [0]  # 첫 번째 샘플이 이상치로 가정
    
    # 이상치 인덱스 보정 (time_steps 고려)
    time_steps = 10
    anomalies_corrected = [x + time_steps for x in anomalies]
    
    # 결과 DataFrame 초기화
    results = pd.DataFrame({
        'status': ['SAFE'] * len(df),  # 초기 상태를 'SAFE'로 설정
        'worker_id': df['UserCode'].values  # 'UserCode'를 'worker_id'로 사용
    })
    
    # 이상치에 대한 상태를 'CAUTION'으로 업데이트
    for idx in anomalies_corrected:
        if idx < len(results):  # 인덱스가 결과 DataFrame의 범위 내에 있는지 확인
            results.at[idx, 'status'] = 'CAUTION'
    
    # 스프링 부트 서버의 주소와 엔드포인트
    # url = 'http://localhost:8080/receiveData'
    url = 'http://localhost:5000/receiveData'
        
    # 스프링 부트 서버에 POST 요청을 보냅니다.
    response = requests.post(url, json=results.to_dict(orient='records'))
    
    # 스프링 부트 서버로부터의 응답을 반환합니다.
    return jsonify(response.json()), response.status_code


