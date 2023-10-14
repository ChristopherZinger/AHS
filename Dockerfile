FROM node:18-alpine

RUN mkdir /home/webapp

RUN npm install pm2 -g

COPY ./build /home/webapp

COPY ./static /home/webapp

COPY ./package.json /home/webapp

COPY ./package-lock.json /home/webapp

COPY ./prisma/migrations /home/webapp/prisma/migrations

COPY ./prisma/schema.prisma /home/webapp/prisma/schema.prisma

WORKDIR /home/webapp

RUN npm ci --production

RUN npx prisma generate

CMD ["pm2-runtime", "npm run serve-production"]