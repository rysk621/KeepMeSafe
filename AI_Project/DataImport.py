# import os
# import pandas as pd
# import csv
# from datetime import datetime

# # 함수 정의
# def savedata(data):
#     directory = "C:/Users/user/KeepMeSafe"
#     if not os.path.exists(directory):
#         os.makedirs(directory)
    
#     # DataFrame 생성
#     df = pd.DataFrame(data)
    
#     # 'registerDate' 필드 처리
#     def convert_timestamp_to_date(timestamp):
#         return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
    
#     if isinstance(data, dict):
#         if 'registerDate' in data:
#             data['registerDate'] = convert_timestamp_to_date(data['registerDate'])
#     elif isinstance(data, list):
#         for item in data:
#             if 'registerDate' in item:
#                 item['registerDate'] = convert_timestamp_to_date(item['registerDate'])   
    
#     df['registerDate'] = pd.to_datetime(df['registerDate'])
#     df.sort_values(by='registerDate', inplace=True)
#     df.ffill(inplace=True)
          
#     file_name = "dataSaveTest8.csv"
#     fieldnames = ["id", "usercode", "latitude", "longitude", "heartbeat", "temperature", "outTemp", "registerDate"]
    
#     try:
#         with open(file_name, 'x', newline='') as csvfile:
#             writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
#             writer.writeheader()
#     except FileExistsError:
#         pass
    
#     with open(file_name, 'a', newline='') as csvfile:
#         writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
#         if isinstance(data, list):
#             for item in data:
#                 writer.writerow(item)
#         else:
#             writer.writerow(data)
       

# # 함수 호출 예시
# # savedata(data)
