FROM node:18-alpine

RUN mkdir /home/webapp

RUN npm install pm2 -g

COPY ./build /home/webapp

COPY ./package.json /home/webapp

WORKDIR /home/webapp

RUN npm install

CMD ["pm2-runtime", "/home/webapp/index.js"]