# Sharing global data in Next.js with custom App and useContext Hook

# https://reacttricks.com/sharing-global-data-in-next-with-custom-app-and-usecontext-hook/


## resync with sources:
git fetch  
git reset --hard origin/master

## switch to remote branch
- git checkout --track origin/daves_branch

## branching
git checkout -b "iss1" 5773  
git checkout -d "iss1"  

## git fetch
git fetch --all
git checkout origin/homeuse
git branch -b "iss1"
git checkout "homeuse"
git merge  "iss1"

## add origin
git remote add origin git://github.com/ling910520/file-monitoring
git push - u origin master

## resync with sources:
git fetch  
git reset --hard origin/master

## switch to remote branch
- git checkout --track origin/daves_branch

## tracked newly created remote branch

git checkout --track origin/test1


##  Changing the Last Commit:
git commit --amend --no-edit

## git rebase
git rebase master
git rebase --continue

## git delete remote branch
git push -d origin test1

## git push branch to origin
git push origin testfa

# Docker 
## Dockerfile
FROM node:10.13-alpine  
ENV NODE_ENV production  
## Setting working directory. All the path will be relative to WORKDIR  
WORKDIR /usr/src/app  
COPY . .  

RUN rm -rf node_modules  
RUN rm -rf .next  
RUN yarn config set strict-ssl false  
RUN yarn  
RUN yarn build  

## docker build -t my-tpm-consumption .
## docker build -t my-nginx .
## docker images  

## docker system prune -a

## Run ‘docker ps -a’ to see all containers which are running on system.

## docker stop <container_id>
## docker rm <container_id> or docker rmi <imageid>
## docker rmi my-tpm-consumption:v1.0

## docker run --rm -it -p 3334:3001 0fdc339aab76    
## docker run --rm -it -p 3334:3001 my-docker:v1.0
## docker run --rm -it -p 3334:3001 my-nginx
## docker run -p 8080:8080 samples   

# docker compose 
## docker-compose up -d --build
## docker-compose ps
## docker-compose rm
## docker-compose start 
## docker-compose stop
## http://sauling:3000

# powershell
## docker ps -q | % { docker stop $_ }