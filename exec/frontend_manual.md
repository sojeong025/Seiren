### Jenkins - Execute shell
```
cd Frontend/Seiren
cp $ENV_FILE .env

npm install
npm run build

cp $PEM_FILE ../J9E105T.pem
cd ../
chmod 600 J9E105T.pem
scp -r -v -o StrictHostKeyChecking=no -i J9E105T.pem ./Seiren/dist ubuntu@j9e105.p.ssafy.io:/home/ubuntu/app
```

### Jenkins - Execute shell script on remote host using ssh
```
docker stop nginx-react
cd /home/ubuntu/app
docker build -t nginx-react
docker run -v /home/ubuntu/app/dist:/usr/share/nginx/ -d --rm -p 3000:80 --name nginx-react nginx-react
```

### docker - nginx default.conf
```
server {
        listen 80;
        server_name j9e105.p.ssafy.io;

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        location / {
                root /usr/share/nginx/dist;
                try_files $uri $uri/ /index.html;
        }
}
```

