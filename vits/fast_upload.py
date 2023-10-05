from fastapi import FastAPI, UploadFile, Form, BackgroundTasks, Header
from fastapi.middleware.cors import CORSMiddleware
import os
import zipfile
import random
import subprocess
import shutil
import json
import requests

from fastapi.responses import JSONResponse

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/upload')
async def upload_start(background_tasks: BackgroundTasks, zipURL: str, voice_id: str, Authorization: str = Header(...)):
    background_tasks.add_task(preprocess_data, zipURL, voice_id, Authorization)
    
    content = {"success": True, "response": "Preprocessing started", "apiError": None}
    headers = {"Content-Type": "application/json; charset=utf-8"}
    
    return JSONResponse(content=content, headers=headers)

async def preprocess_data(zipURL: str, voice_id: str, Authorization: str = Header(...)):
    
    # zipURL에서 파일 다운로드
    response = requests.get(zipURL)
    
    # Create a directory with the voice_id as the name if it doesn't exist
    dir_path = os.path.join(os.getcwd(), 'data123')
    dir_path = os.path.join(dir_path, voice_id)
    
    if os.path.exists(dir_path):
        os.system(f'rm -r {dir_path}')
        
    os.makedirs(dir_path)

    # Save the zip file to the directory temporarily
    filepath = os.path.join(dir_path, 'file.zip')
    
    with open(filepath, 'wb') as buffer:
        buffer.write(response.content)

        # Unzip the file in the directory with user id as its name.
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
                zip_ref.extractall(dir_path)

        # Remove temporary zip file after extraction.
        os.remove(filepath)
    
    # 전처리
    # 1. train, val split
    # Read the data from the file
    with open(dir_path + '/output.txt', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Shuffle the data
    random.shuffle(lines)

    # Calculate the number of lines for training (70%)
    num_train = int(len(lines) * 0.7)

    # Split the data into training and validation sets
    train_lines = lines[:num_train]
    val_lines = lines[num_train:]

    # Write the training data to a file
    with open(dir_path + '/output_train.txt', 'w', encoding='utf-8') as f:
        for line in train_lines:
            f.write(line)

    # Write the validation data to a file
    with open(dir_path + '/output_val.txt', 'w', encoding='utf-8') as f:
        for line in val_lines:
            f.write(line)
    
    # 2. 음소분리
    if not voice_id:
        return {"error": "User ID is required"}, 400

    command = f"python preprocess.py --text_index 1 --filelists data123/{voice_id}/output_train.txt data123/{voice_id}/output_val.txt --text_cleaners 'korean_cleaners'"

    try:
        process = subprocess.Popen(command, shell=True)
        process.communicate()

        if process.returncode != 0:
            return {"error": "Command execution failed"}, 500

        print("Data Preprocessing started successfully")

    except Exception as e:
        return {"error": str(e)}, 500
    
    # 3. config.json 생성 
    # 원본 파일 경로
    src = './data123/config.json'

    # 대상 디렉토리 경로
    dst = f'./data123/{voice_id}/config.json'

    # 파일 복사
    shutil.copy(src, dst)

    # JSON 파일 열기 및 데이터 로드
    with open(f'./data123/{voice_id}/config.json', 'r') as f:
        config = json.load(f)

    # 데이터 수정
    config['data']['training_files'] = f'data123/{voice_id}/output_train_cleaned.txt'
    config['data']['validation_files'] = f'data123/{voice_id}/output_val_cleaned.txt'

    # JSON 파일에 다시 쓰기
    with open(f'./data123/{voice_id}/config.json', 'w') as f:
        json.dump(config, f, indent=4)

    # 4. 음성파일 전처리
    # 22050Hz 로 변환 해야하는 경우 작성
    
    # 5. checkpoints에 디렉토리 생성후 사전 학습모델 집어 넣기
    if not os.path.exists(f'./checkpoints/{voice_id}'):
        os.makedirs(f'./checkpoints/{voice_id}')
    
    d_src = './train2/D_565000.pth'
    g_src = './train2/G_565000.pth'
    
    d_dst = f'./checkpoints/{voice_id}/D_0.pth'
    g_dst = f'./checkpoints/{voice_id}/G_0.pth'
    
    shutil.copy(d_src, d_dst)
    shutil.copy(g_src, g_dst)
    
    # Define headers with Authorization field
    headers = {"Authorization": Authorization}

    # Send a post request to the specified url with user id as a parameter and the defined headers
    response = requests.post("http://70.12.130.121:1469/train", data={"voice_id": voice_id}, headers=headers)
    
    content = {"success": True, "response": "File uploaded and unzipped successfully", "apiError": None}
    headers = {"Content-Type": "application/json; charset=utf-8"}
    
    return JSONResponse(content=content, headers=headers)

#     return {"message":'File uploaded and unzipped successfully'}, 200

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app=app, host='0.0.0.0', port=1468)
