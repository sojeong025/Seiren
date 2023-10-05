A. 사용한 JVM, WAS 제품 등의 종류와 설정 값, 버전(IDE버전 포함) 기재
- JVM : JDK17
- WAS : Tomcat
- 웹서버 : nginx/1.18.0 (Ubuntu)
- IDE
    - Front - Visual Studio Code(v1.83)
    - Back - IntelliJ IDEA 2023.1.3
    - AI - Anaconda - JupyterNotebook


B. 빌드 시 사용되는 환경변수 등의 내용 상세 기재
- env.properties (for SpringBoot)
```
secret=a2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10ba2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10ba2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10ba2FyaW10b2thcmltdG9rYXJpbXRva2FyaW10b
# ??? ??? ??
kakao.client.id=5d8d490d89bd94350ede865bf72b5f3e
kakao.client.secret=gUDA5FMuJqHA3zI12u3p0yoLXQT9U1tL
kakao.redirect.url=http://localhost:5173/oauth/callback/kakao
# Mysql
DB_URL=stg-yswa-kr-practice-db-master.mariadb.database.azure.com:3306
DB_USERNAME=S09P22E105@stg-yswa-kr-practice-db-master.mariadb.database.azure.com
DB_PASSWORD=jwyfWaxinj
# s3
bucket=taw-s3-bucket2
s3.accessKey=AKIA5JWD3S4F2LOMOMU3
s3.secretKey=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
```
- .env(for React)
```
VITE_KAKAO_LOGIN_URL= https://kauth.kakao.com/oauth/authorize?client_id=5d8d490d89bd94350ede865bf72b5f3e&redirect_uri=http://j9e105.p.ssafy.io/oauth/callback/kakao&response_type=code

VITE_PUBLIC_REGION = ap-northeast-2
VITE_PUBLIC_ACCESSKEY = AKIA5JWD3S4F2LOMOMU3
VITE_PUBLIC_SECRETKEY = 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
VITE_PUBLIC_BUCKET = taw-s3-bucket2
```


C. 배포 시 특이사항 기재
- Nginx를 사용해서 프록시 역할 및 포트 포워딩
- 하나의 ec2안에 Docker를 사용해 Spring container, Nginx (React) container, Jenkins container, Redis container 동작


D. DB 접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록
- 소셜 로그인
- 관리자 계정 없음


