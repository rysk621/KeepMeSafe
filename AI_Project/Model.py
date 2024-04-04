# Autoencoder 클래스 정의 ---------------------------------------------------------------------------------------------------------------

import torch.nn as nn

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