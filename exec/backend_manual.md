### ec2 Docker 설치
```
$ sudo su - # 관리자 권한으로 들어감
$ git clone https://github.com/Kyeongrok/docker_minikube_kubectl_install # 도커 설치 파일 클론
$ cd docker_minikube_kubectl_install/ # 도커 설치 파일로 이동
$ sh docker_install.sh # 도커 설치 파일 실행
$ docker # 도커 설치 확인. 잘 설치됐으면 명령어 리스트 출력
```

### docker - jenkins 설치
```
#docker run -itd --name jenkins -p 9000:8080 jenkins/jenkins:lts-jdk17
```
- “http://j9e105.p.ssafy.io:9000/” 로 접속

- 로그인 & Install suggested plugins
- gitlab 플러그인 설치
- Gitlab Credential 추가
- Item 생성
- Webhook 설정
    - Jenkins 설정
    - Gitlab 설정
- Build 설정 및 .jar 파일 EC2에 저장
```
# Execute shell
cd Backend/Seiren
cp $ENV_FILE src/main/resources/properties/env.properties

chmod +x ./gradlew
./gradlew clean build -x test

cp $PEM_FILE ../J9E105T.pem
cd ../
chmod 600 J9E105T.pem
scp -v -o StrictHostKeyChecking=no -i J9E105T.pem ./Seiren/build/libs/Seiren-0.0.1-SNAPSHOT.jar ubuntu@j9e105.p.ssafy.io:/home/ubuntu/app-server
```
- Execute shell script on remote host using ssh (for run spring boot program)
```
docker stop spring
docker run -itd --rm -p 8080:8081 --name spring -v /home/ubuntu:/app -e "SPRING_PROFILES_ACTIVE=production-set1" spring:1 java -jar /app/app-server/Seiren-0.0.1-SNAPSHOT.jar
```

### docker - redis 설치 및 실행
```
docker pull redis # 설치

docker run -d -p 6379:6379 --name redis-test redis:6.2 # 실행 (기본포트 설정)

docker exec -it redis-test redis-cli # 실행중인 레디스 런타임에 접근
```

### nginx default.conf 설정
```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        #server_name _;
        server_name localhost;

        location / {
                proxy_pass http://127.0.0.1:3000;
        }

        location /api {
                proxy_pass http://127.0.0.1:8080;
        }

}

server {

        server_name j9e105.p.ssafy.io;


        location / {
                proxy_pass http://j9e105.p.ssafy.io:3000/;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
        }

        location /ai {
                proxy_pass http://70.12.130.121:1470;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
        }

        location /api {
                proxy_pass http://j9e105.p.ssafy.io:8080/api;
                proxy_set_header X-Real-Ip $remote_addr;
                proxy_set_header x-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;
        }


        #listen 443 ssl; # managed by Certbot
        listen 80;
        #ssl_certificate /etc/letsencrypt/live/j9e105.p.ssafy.io/fullchain.pem; # managed by Certbot
        #ssl_certificate_key /etc/letsencrypt/live/j9e105.p.ssafy.io/privkey.pem; # managed by Certbot

        #include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        #ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = j9e105.p.ssafy.io) {
      return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80 ;
    listen [::]:80 ;
    server_name j9e105.p.ssafy.io;
    return 404; # managed by Certbot

}

```














































