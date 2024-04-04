# 실제로 데이터를 분석하는 곳
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from sklearn.preprocessing import MinMaxScaler
from torch.utils.data import DataLoader, TensorDataset
import matplotlib.pyplot as plt  # 데이터 시각화를 위한 라이브러리
from flask import Flask, request, jsonify
from datetime import datetime, timezone
from zoneinfo import ZoneInfo




app = Flask(__name__)


# 날짜 형식 조정 ---------------------------------------------------------------------------------------------------------------

# def convert_timestamp_to_date(timestamp):
#     """밀리초 단위의 타임스탬프를 'Asia/Seoul' 시간대를 기준으로 'YYYY-MM-DD HH:MM:SS' 형태의 문자열로 변환합니다."""
#     dt_local = datetime.fromtimestamp(int(timestamp) / 1000, tz=ZoneInfo('Asia/Seoul'))
#     return dt_local.strftime('%Y-%m-%d %H:%M:%S')

# 결과 내보내기 ---------------------------------------------------------------------------------------------------------------

@app.route('/postLog/<usercode>', methods=['POST'])
def handle_post_log(usercode):

    # 가정: 'real.csv' 파일에 분석할 실제 데이터가 있으며,
    # 여기서는 이미 준비된 10개의 데이터를 사용한다고 가정합니다.

    # 데이터 불러오기 및 전처리 (10개 데이터 예시)
    # df = pd.read_csv("./data/user_code_total/real.csv")

    # 'Content-Type'을 검증하지 않고 요청 데이터를 JSON으로 처리
    data = request.get_json(force=True)
      
    df = pd.DataFrame(data)
    
    df = df.tail(10)  # 최근 10개 데이터만 사용
    
    #  파일 이름 정의
    file_name = f"dataSaveTest_{usercode}.csv"  # 예를 들어 {usercode}, REST API로부터 받은 값

    # 파일 저장
    try:
        with open(file_name, 'x') as f:
            # 파일이 새로 생성되었으므로, 헤더와 함께 데이터를 저장
            df.to_csv(file_name, index=False, mode='w', header=True)
    except FileExistsError:
        # 파일이 이미 존재하면, 헤더 없이 데이터를 추가
        df.to_csv(file_name, index=False, mode='a', header=False)

    
    # 파일을 불러옵니다.
    df = pd.read_csv(file_name)
    df = df.tail(10)  # 최근 10개 데이터만 사용

    # # 심박수 데이터 추출 및 스케일링
    heartbeat_data = df['heartbeat'].values.reshape(-1, 1)
    scaler = MinMaxScaler(feature_range=(0, 1))
    heartbeat_data_scaled = scaler.fit_transform(heartbeat_data)

    
    
        # MinMaxScaler 인스턴스 생성
    scaler = MinMaxScaler(feature_range=(0, 1))

    # 고정된 최소값과 최대값을 사용하기 위해 scale_와 min_ 직접 설정
    desired_min = 50  # 사용자가 정한 데이터의 최소값
    desired_max = 200  # 사용자가 정한 데이터의 최대값

    # scale_와 min_ 계산
    scaler.scale_ = 1 / (desired_max - desired_min)
    scaler.min_ = -desired_min * scaler.scale_

    # transform 메서드를 사용하여 데이터 스케일링
    heartbeat_data_scaled = scaler.transform(heartbeat_data)

    # print("Original Data:\n", heartbeat_data)
    # print("Scaled Data:\n", heartbeat_data_scaled)
    
    
    
    #     # 고정된 범위를 사용하여 MinMaxScaler 초기화
    # scaler = MinMaxScaler(feature_range=(0, 1))
    #     # 고정된 최소값과 최대값 설정
    # scaler.data_min_ = np.array([40])  # 심박수 데이터의 최소값
    # scaler.data_max_ = np.array([200])  # 심박수 데이터의 최대값
    # scaler.scale_ = 1 / (scaler.data_max_ - scaler.data_min_)
    # scaler.min_ = -scaler.data_min_ * scaler.scale_
    # heartbeat_data_scaled = scaler.transform(heartbeat_data)
    
    

    # PyTorch 텐서로 변환 및 차원 조정
    X = torch.Tensor(heartbeat_data_scaled).unsqueeze(2)  # [1, 10, 1] 형태로 변환

    # LSTM 기반 오토인코더 모델 정의 
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
            decoded = decoded.contiguous().view(-1, x.size(2))
            decoded = self.linear(decoded)
            return decoded.view(x.size(0), x.size(1), -1)

    # 모델 불러오기 (가정: 학습된 모델이 'best_model.pth'에 저장되어 있음)
    model_path = f"C:/Users/user/KeepMeSafe/AI_Project/trainedModel/best_model_user_code_{usercode}.pth"
    model = Autoencoder(input_dim=1, hidden_dim=50, num_layers=2)
    # map_location을 사용하여 CPU에서 모델 상태 사전을 로드
    model_state = torch.load(model_path, map_location=torch.device('cpu'))

    # 모델 상태 사전을 사용하여 모델에 가중치 로드
    model.load_state_dict(model_state)

    
    # model.load_state_dict(torch.load(model_path))
    model.eval()


    # 데이터에 대한 예측 수행 및 재구성 오차 계산
    criterion = torch.nn.MSELoss()  # 평균 제곱 오차 손실 함수
    with torch.no_grad():
        outputs = model(X)
         # 전체 배치에 대한 평균 재구성 오차를 계산합니다.
        reconstruction_errors = criterion(outputs, X).item()

    print(f'재구성 오차: {reconstruction_errors}')

    # 재구성 오차를 기반으로 필요한 분석 수행
    # 예를 들어, 특정 임계값을 기반으로 이상치 판단 등

    # 재구성 오차 계산
    criterion = torch.nn.MSELoss()
    reconstruction_errors = []

    with torch.no_grad():
        outputs = model(X)
        # 각 데이터 포인트별 재구성 오차를 계산합니다.
        for i in range(X.size(0)):
            loss = criterion(outputs[i], X[i]).item()
            reconstruction_errors.append(loss)

    # 임계값 설정
    mean_reconstruction_error = np.mean(reconstruction_errors)
    std_reconstruction_error = np.std(reconstruction_errors)
    threshold = mean_reconstruction_error + 2 * std_reconstruction_error

    # 상태 값에 대한 명시적 정의
    SAFE = 0
    CAUTION = 1
    WARNING = 2
    check = 9

    # 이상치를 식별합니다.
    # anomalies = [i for i, error in enumerate(reconstruction_errors) if error > threshold]

    
    # 데이터 프레임에 변동값 계산을 위한 새 열 추가
    df['change'] = df['heartbeat'].diff().abs()


    # 결과 DataFrame 초기화
    results = pd.DataFrame({
        'status': [SAFE] * len(df),  # 모든 초기 상태를 'SAFE'로 설정
        'worker_id': df['usercode'].values,  # 'UserCode'를 'worker_id'로 사용
        'heartbeat': df['heartbeat'].values  # 'heartbeat' 값을 추가
    })

    # 이상치에 대한 상태를 'check'으로 업데이트
    # for idx in anomalies:
    #     results.at[idx, 'status'] = check
        
    # 변동값이 30 이상이거나, 값 자체가 150 이상인 데이터 포인트에 대해서도 상태를 'check'으로 업데이트
    for idx, row in df.iterrows():
        if row['change'] > 30 or row['heartbeat'] >= 150 or row['heartbeat'] <= 50:
            results.at[idx, 'status'] = check
    

    # 'status' 열에서 CAUTION(2)이 3개 이상 있는지 검사
    caution_count = sum(results['status'] == check)

    if caution_count > 2: # 3개 이상
        overall_status = WARNING
    elif caution_count > 1: # 2개 이상
        overall_status = CAUTION
    else:                   # 1개 이하
        overall_status = SAFE
    

    
    

    # JSON 형식으로 결과 반환
    result = {
        'status': overall_status,
        'worker_id': int(df['usercode'].iloc[-1])  # 마지막 worker_id 반환
    }

    # 결과 출력 (Flask 등의 웹 프레임워크 사용 시)
    print(f"results : \n{results}\n")
    print(f"result : {result}\n")
    print(f"threshold : {threshold}\n")

    return jsonify(result)
    
    

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)