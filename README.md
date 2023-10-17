<div align="center">

# 🎙&nbsp; Seiren
사용자가 자신의 <b>목소리를 등록</b>하고, 텍스트를 입력하면<br/> 해당 텍스트가 <b>사용자의 목소리로 변환되어 출력</b>되는 <U>AI 기반 음성 서비스</U> <br/>  

<img src="/uploads/b0d820abc89c226c41d3803a36fe3bf6/MainPage.gif" width="700">
</div>


## 목차

1. [개요](#개요)
2. [서비스 화면](#서비스-화면)
3. [기술 소개](#기술-소개)
4. [개발 환경](#개발-환경)
5. [설계 문서](#설계-문서)
6. [팀원 소개](#팀원-소개)


## 1. 개요
> <b>프로젝트 기간</b> : 2023/08/21 ~ 2023/10/06 <br>
> <b>참고자료 </b> : 🎞 [UCC](https://www.youtube.com/watch?v=2VDcku13lkk)
📃 [최종발표 자료](https://drive.google.com/file/d/1iTcuW2Ohn8m3WWf5kYmd6j4i9W_lP2A0/view?usp=sharing)
<br>

## 2. 서비스 화면
1️⃣ <b>메인 페이지 & 어바웃 페이지</b>

|<img src="/uploads/b0d820abc89c226c41d3803a36fe3bf6/MainPage.gif">|<img src="/uploads/2aacb8c24e0a0c2636d27daeecbb4d86/loginPage.gif">|
| :------: | :------: |
| **Main Page** | **Login Page** |
|<img src="/uploads/32ccc43db339a9ed12116fcb20e4dcc3/aboutPage.gif">|<img src="/uploads/20b5f7042593edc9a22ac2a87271c8fb/aboutPage_2_.gif">|
| **About Page** | **About Page** |
<br>
2️⃣ <b>스토어 페이지</b>

|<img src="/uploads/8d96fe715733efc63cfeac4fd46dd5fe/store_1_.gif">|<img src="/uploads/e6438fe3809461e35185600fd901284d/store_2_.gif">|
| :------: | :------: |
| **Store Page** | **Filter** |
|<img src="/uploads/039dc5ea323bd4450f62eac52a0b8cc3/storeDetail_1_.gif">|<img src="/uploads/0ae386b2b1a527daabbfe97a8b52f2bc/storeDetail_2_.gif">|
| **Product Detail** | **Product Test** |
|<img src="/uploads/262a3a8e1d7017dbb32dfe972a90d59b/storeDetail_3_.gif">||
| **Purchase Page** ||
<br>
3️⃣ <b>레코드 페이지</b>

|<img src="/uploads/38afd98467912b918655bd97fcc69779/Record_1_.gif">|<img src="/uploads/5d2ffa58914cf30695035ed714cf40a8/Record_2_.gif">|
| :------: | :------: |
| **No Voice** | **Record Page** |
|<img src="/uploads/ec21511dd6834c82f446919adfcdcb71/Record_3_.gif">|<img src="/uploads/dea2f06ce9f944f9e2ff4bcc9db57a4c/Record_4_.gif">|
| **Voice Studying Page** | **Voice Finish Page** |
|<img src="/uploads/0ae836df524a155fb4d6b95c26ee455f/Record_5_.gif">||
| **Product Custom Page** ||

<br>
3️⃣ <b>마이 페이지</b>

|<img src="/uploads/c2a0f26fc27688da96d352629e3d3eda/myProfile_1_.gif">|<img src="/uploads/617651b2810508539ddd939648e842fc/myProfile_2_.gif">|
| :------: | :------: |
| **Profile Page** | **My Voice Detail** |
|<img src="/uploads/ba7f379b9911bdef6735666d4ce60492/my_SellList_1_.gif">|<img src="/uploads/1d6bb2185eb42eaa48210a2f87166ff8/my_SellList_2_.gif">|
| **SellList Page** | **Sell Detail** |
|<img src="/uploads/ba7f379b9911bdef6735666d4ce60492/my_SellList_1_.gif">||
| **BuyList Page** ||
|<img src="/uploads/b9271c3ec2943b264009c7c62e79f29b/my_Use_1_.gif">|<img src="/uploads/f29bc3308956cd43cefccfeef91e631d/my_Use_2_.gif">|
| **UseList Page** | **VoiceUse Detail** |

<br>

## 3. 기술 소개
- ##### 1. AI-VOICE 생성
  
  - ###### 자신의 목소리 여러가지 등록 가능
  - ###### 다발적 AI-Voice 학습 가능
  - ###### 적은 량의 데이터로도 양질의 Voice 모델


- ##### 2. Store 기능
  
  - ###### 생성된 AI-Voice 모델 (글자단위) 판매 및 구매 가능
  - ###### 타인의 AI-Voice 모델 구매 가능 (글자단위)
  - ###### 생성한 TTS 다운로드 및 바로듣기 가능

- ##### 3. 역동적 디자인
  
  - ###### GSAP을 이용한 애니메이션 추가
<br>

## 4. 개발 환경
### ⚙ Management Tool
- 형상 관리 : Gitlab
- 이슈 관리 : Jira
- 커뮤니케이션 : Mattermost, Notion, Discord
- 디자인 : Figma, PowerPoint

### 💻 IDE
- Visual Studio Code `1.83.0`
- IntelliJ `11.0.19`

### 📱 Frontend
- @date-io/date-fns@2.17.0
- @emotion/react@11.11.1
- @emotion/styled@11.11.0
- @lottiefiles/react-lottie-player@3.5.3
- @mui/material@5.14.11
- @mui/styled-engine-sc@5.14.11
- @types/axios@0.14.0
- @types/node@20.8.2
- @types/react-dom@18.2.8
- @types/react@18.2.24
- @typescript-eslint/eslint-plugin@6.7.4
- @typescript-eslint/parser@6.7.4
- @vitejs/plugin-react-swc@3.4.0
- @vitejs/plugin-react@4.1.0
- audiobuffer-to-wav@1.0.0
- aws-sdk@2.1468.0
- axios@0.21.4
- date-fns@2.30.0
- esbuild@0.18.20 invalid: "^0.19.4" from the root project
- eslint-config-prettier@9.0.0
- eslint-import-resolver-typescript@3.6.1
- eslint-plugin-import@2.28.1
- eslint-plugin-prettier@5.0.0
- eslint-plugin-react-hooks@4.6.0
- eslint-plugin-react-refresh@0.4.3
- eslint-plugin-react@7.33.2
- eslint@8.50.0
- extendable-media-recorder-wav-encoder@7.0.98
- extendable-media-recorder@9.1.2
- framer-motion@10.16.4
- gsap@3.12.2
- lottie-react@2.4.0
- prettier@3.0.3
- react-calendar@4.6.0
- react-datepicker@4.18.0
- react-dom@18.2.0
- react-icons@4.11.0
- UNMET DEPENDENCY react-player@^2.13.0
- react-router-dom@6.16.0
- react-scroll@1.8.9
- react-slick@0.29.0
- react-youtube@10.1.0
- react@18.2.0
- recharts@2.8.0
- recoil@0.7.7
- rollup@3.29.4
- slick-carousel@1.8.1
- standardized-audio-context@25.3.57
- styled-components@5.3.11
- terser@5.21.0
- typescript@5.2.2
- vite-tsconfig-paths@4.2.1
└── vite@4.4.9

### 💾 Backend
  - jpa
  - redis
  - security
  - jdbc
  - oauth2
  - lombok
  - h2
  - mysql
  - swagger
  - jwt
  - s3

### AI

  - Cython
  - librosa==0.8.0
  - matplotlib
  - numpy
  - scipy
  - tensorboard
  - unidecode
  - pyopenjtalk
  - jamo
  - pypinyin
  - jieba
  - protobuf
  - cn2an
  - inflect
  - eng_to_ipa
  - ko_pron
  - indic_transliteration
  - num_thai
  - opencc
  - ipython
  - gradio


### Infra

- AWS S3
- AWS EC2
- Nginx 1.18.0
- Docker 20.10.12
- Jenkins
- Redis
- Ubuntu 20.04.6 LTS
- Spring Boot

<br>

## 5. 설계 문서


### ◼ 요구사항 명세서

<img src="/uploads/9c292c154b9c1a414048690300e731d8/요구사항명세서_1_.PNG"/>

<img src="/uploads/8b736ad644021063f32428bbd78a7807/요구사항명세서_2_.PNG"/>

<img src="/uploads/b4d831567ba8d698a565841b3f9b8412/요구사항명세서_3_.PNG"/>

<img src="/uploads/6cc05dd2d6f40df975303a0791a22aca/요구사항명세서_4_.PNG"/>



### ◼ API 명세서

<img src="/uploads/80e004e8fc866b0015fda80f1c8ec04b/API_1_.png"/>

<img src="/uploads/d6157b98e9d8ed90764bc0628a74bfdc/API_2_.png"/>

<img src="/uploads/9b5257a6e62fe9b2de6d946451fd8e8a/API_3_.png"/>

<img src="/uploads/7aadb26c23fa044663099434ec58a0af/API_4_.png"/>

<img src="/uploads/0c8fbc6120e7b4ab1323d3615b03eb59/API_5_.png"/>

<img src="/uploads/07f39ae93f2e24ea1fa217cb4c0f001a/API_6_.png"/>

<img src="/uploads/a36b5cd74a4ef63d9d640292ab31008d/API_7_.png"/>

<img src="/uploads/6f62a7904da6e57a4fa0593907cdafb3/API_8_.png"/>

<img src="/uploads/7fa5376f4b3c62ba491165de6a6c7317/API_9_.png"/>

<img src="/uploads/9ae7f0f3c3129d3ed9be14ad92bd5bb1/API_10_.png"/>



### ◼ ERD

<img src="/uploads/efab5be1d9c1978c56821e5de9e71d59/ERD.png"/>

### ◼ Swagger


### ◼ 시스템 아키텍처

<img src="/uploads/62e9409e4baf25518fbeaff640d8f493/아키텍쳐.png"/>

# 팀원 소개

| **[성제현](https://github.com/protofu)**                                                          | **[정소정](https://github.com/sojeong025)**                                                           | **[최진석](https://github.com/choiapple)**                                                               | **[구배성](https://github.com/deerKBS)**                                                               | **[황재영](https://github.com/JJaeki)**                                                              | **라동엽**                                                             |
|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------:|
| <img title="" src="/uploads/ae66cf5c3a1b0cfd159d6035dc1f5524/SJH.png" alt="" width="500"> | <img title="" src="/uploads/3fc78fc8638acc7c10f2020b1bafebaf/JSJ.png" alt="" width="500"> | <img title="" src="/uploads/aff04cba1009b64aa036b167c033b0cc/CJS.png" alt="" width="500"> | <img title="" src="/uploads/1d9490cf7bf23efd3e0886878d01ec7c/KBS.png" alt="" width="500"> | <img title="" src="/uploads/66541ff290a9a539a3d87e82943fd568/HJY.png" alt="" width="500"> | <img title="" src="/uploads/7741e56d270cd1f471b93ca2b02ff0ff/RDY.png" alt="" width="500"> |
| Frontend                                                                                           | Frontend                                                                                           | FullStack                                                                                           | FullStack & CI/CD                                                                                          | Backend                                                                                            | AI                                                                                            |

## 😎 역할 분담

**Frontend**

- 성제현 : UX/UI 설계 / 마이페이지 제작 및 api / 문서화 작업 / 빌드 및 오류 수정

- 정소정 : UX/UI 설계 / PPT제작 / 영상 제작 / 발표 / 디자인 총괄 / 전 페이지 검수

**Full Stack**

- 최진석 : API 제작 / front api 연결 / 오류 수정 / DB 설계

**Full Stack & CI/CD**

- 구배성: API 제작 / CI/CD 담당 / 영상 제작 / Front 배포 오류 수정

**Backend**

- 황재영 : API 제작 / 검색 기능 제작 / DB 관리


**AI**

- 라동엽 : Flask 서버 구축 / AI 학습 모델 생성 
