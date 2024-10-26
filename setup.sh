#!/bin/bash

# Node.js 20 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 프로젝트 디렉토리로 이동 및 빌드
cd skin/
npm install
npm run build

# Nginx 설치
sudo apt-get update
sudo apt-get install -y nginx

# Nginx 설정 파일 수정
sudo tee /etc/nginx/sites-available/default > /dev/null <<EOT
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm;

    server_name _;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOT

# 빌드된 파일을 Nginx의 서비스 디렉토리로 복사
sudo cp -r build/* /var/www/html/

# Nginx 재시작
sudo systemctl restart nginx

echo "Setup completed successfully!"
