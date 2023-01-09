# architecturehorrorstory

## Firebase Admin

remember to export GOOGLE_APPLICATION_CREDENTIALS - point to correct json file
`npm run export-google-credentials`

## Hosting info

This is sveltekit app that runs on custom node server. It uses @sveltejs/node-adapter to build the app. Webapp is dockerized and communicates with 2 dockerized databases - redis and postgres. Webapp connect to postgress with prisma.

## Local Developement

First spin up redis and postgres using docker-compose.local.yml `docker-compose -f docker-compose.local.yml up` Once it's ready you can spin up the app with `npm run dev` - default sveltekit command.

## Deploy changes to server

1. After commiting changes to sveltekit app (webapp) you need to build it
   `> npm run build`

2. Build docker image with new version of the app. Navigate to the folder with Dockerfile and put correct names and version in following command
   `> docker build -t <dockerhub_username>/<image_name>:<tag>`
   `> docker build -t chriswebdev1/ahs_test:1.0.0`

3. Test the image locally. First check id of just created image
   `docker images`

4. Copy image id and put it in docker-compose.dev.yml file under services.webapp.image

5. Run the app and test new features
   `> docker-compose -f docker-compose.dev-yml up` or
   `> npm run containers:all`

6. Test the app in the browser localhost:3000

7. If everything is fine push image to dockerhub
   `docker push <dockerhub_name>/<image_name>:<tag>`
   `> docker push chriswebdev1/ahs_test:1.0.0`

8. Git commit changes and push to your git repository
   `> git commit -m "new changes"`
   `> git push origin <branch_name>`

9. ssh to your server
   `> ssh -p 22 <username>@<IP>`

10. You should have docker-compose.prod.yml in your server home directory. Update `services.webapp.image` with new version of your app and reload the app
    `> docker-compose -f docker-compose.prod.yml down`
    `> docker-compose -f docker-compose.prod.yml up`

## Folder structure in your server

Folder structure is a bear minimum - just config file. All app related files are dockerized

**Remember**

1. Set correct `services.webapp.image` in docker-compose.prod.yml
2. Set correct redis password in the app -> redis.createClient({<url>}) and in the redis.conf file on the server

- /root/
  - Caddyfile
  - docker-compose.prod.yml
  - redis.conf

## Set up redis

To avoid bugs use the same name for `redis_host_name` and `redis_container_name` in docker compose.

- ./.env
  `REDIS_PASSWORD=<password>`
  `REDIS_HOST=<redis_host_name>`

- ./redis.config
  `user <username> ><password> ~\* +@all`

## Commands cheatsheet

### Caddy

navigate to directory where Caddyfile is

> caddy reload

### pm2

> pm2 list
> pm2 reload
> pm2 start <app_name>
> pm2 stop <app_name,all>
