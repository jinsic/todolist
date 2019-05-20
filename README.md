2019 서머코딩 이진식 todo app

드래그 & 드롭 방식의 todo app

설치방법
1. angular 설치 및 실행
sudo apt-get update && \
sudo apt-get install npm -y && \
sudo npm install -g n && \
sudo n latest && \
sudo npm install @angular/cli -g && \
sudo npm install --unsafe-perm && \
sudo npm install --save-dev @angular-devkit/build-angular && \
cd todolist/client
ng serve &

2. flask 설치 및 실행
sudo apt-get install python3 python3-pip -y && \
sudo pip3 install flask jsonify blueprint flask-cors pymongo && \
cd todolist/server && \
python3 app.py &

3. mongodb 설치 및 실행
sudo apt-get install mongodb -y && \
sudo service mongodb start
