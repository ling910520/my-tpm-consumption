# Sharing global data in Next.js with custom App and useContext Hook

https://reacttricks.com/sharing-global-data-in-next-with-custom-app-and-usecontext-hook/


## resync with sources:
- git fetch
-git reset --hard origin/master

## push branch to origin
- git push origin "branch1"

## switch to remote branch
- git checkout --track origin/daves_branch


## add . and commit before switch
- git add . 
- git commit -m "minor update"
- git push


# Docker 

- Docker file auto generated from vscode
- Docker build . -t my-testing 
- Docker images
- docker run -p 3334:3001 my-tpm-consumption

# after build only deploy
FROM nginx:alpine
COPY /build /usr/share/nginx/html
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]