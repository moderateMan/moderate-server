FROM node:14
WORKDIR /app
COPY . /app

# 构建镜像时，一般用于做一些系统配置，安装必备的软件。可以多个run
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
#安装
RUN npm set registry https://registry.npm.taobao.org
RUN npm install
RUN npm install pm2 -g


# CMD 启动容器 只能有一个 CMD (阻塞控制台)
CMD echo $SERVER_NAME && echo $AUTHOR_NAME && npm run prd && pm2 log

# 环境变量

ENV SERVER_NAME="moderate-server"
ENV AUTHOR_NAME="qanglee"