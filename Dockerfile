FROM node:18-alpine

RUN mkdir /home/webapp

RUN npm install pm2 -g

COPY ./build /home/webapp

COPY ./package.json /home/webapp

COPY ./package-lock.json /home/webapp

COPY ./prisma/schema.prisma /home/webapp/schema.prisma

WORKDIR /home/webapp

RUN npm ci --production

RUN npx prisma generate

CMD ["pm2-runtime", "npm run serve-production"]