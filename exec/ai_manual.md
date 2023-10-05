# 사용 방법

## 파이토치 설치
```sh
pip3 install torch==1.13.1 torchvision==0.14.1 torchaudio==0.13.1 --index-url https://download.pytorch.org/whl/cu117
```

## 필요한 라이브러리 설치
```sh
pip install -r requirements.txt
```
설치 중 'subprocess exited with error' 같은 에러가 발생하면, [visual studio build tools](https://visualstudio.microsoft.com/downloads/?q=build+tools)를 설치하고 재부팅 후 다시 시도해보세요.

## monotonic alignment 라이브러리 설치
```sh
cd monotonic_align
mkdir monotonic_align
python setup.py build_ext --inplace
cd ..
```
역시 설치 중 'subprocess exited with error' 같은 에러가 발생하면, [visual studio build tools](https://visualstudio.microsoft.com/downloads/?q=build+tools)를 설치하고 재부팅 후 다시 시도해보세요.

## 데이터셋 준비

config.json 에서 'n_speakers'는 0으로 설정해줍니다.
- Example
```
dataset/001.wav|그는 괜찮은 척하려고 애쓰는 것 같았다.
dataset/002.wav|그녀의 사랑을 얻기 위해 애썼지만 헛수고였다.
dataset/003.wav|용돈을 아껴 써라.
...
```
이와 같이 텍스트 파일을 만들어줍니다. 학습 데이터와 검증 데이터를 분할해서 'filelist_train.txt'와 'filelist_val.txt'처럼 다른 파일로 만들어줍니다.

## 텍스트 전처리
```sh

python preprocess.py --text_index 1 --filelists path/to/filelist_train.txt path/to/filelist_val.txt --text_cleaners 'korean_cleaners'

```
- 텍스트 전처리가 완료되면.. 
- config.json 파일의 'training_files'을 전처리한 학습 텍스트 파일의 경로로, 
- 'validation_files'을 전처리한 검증 텍스트 파일의 경로로, 
- 'cleaned_text'를 true로 수정해줍니다.

## 사전학습모델
학습을 시작하기 전에 pretrained 폴더의 'G_565000.pth'와 'D_565000.pth'를 학습된 모델이 생성될 폴더에 'G_0.pth'와 'D_0.pth'로 복사해서 넣어줍니다.

## 학습 시작
```sh
python train.py -c <config> -m <folder>

```


### 학습 현황 확인
```sh
tensorboard --logdir checkpoints/<folder> --port 6006
```
## 추론
### 주피터 노트북
[infer.ipynb](infer.ipynb)
### Flask API
[flask_infer.py](flask_infer.py)  
http://localhost:1470/synthesize로 GET 요청
