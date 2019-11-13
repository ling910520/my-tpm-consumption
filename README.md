# Sharing global data in Next.js with custom App and useContext Hook

# https://reacttricks.com/sharing-global-data-in-next-with-custom-app-and-usecontext-hook/


## resync with sources:
<<<<<<< HEAD
- git fetch
-git reset --hard origin/master

## push branch to origin
- git push origin "branch1"
=======
git fetch  
git reset --hard origin/master
>>>>>>> homeuse

## switch to remote branch
- git checkout --track origin/daves_branch

<<<<<<< HEAD

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
=======
## branching
git checkout -b "iss1" 5773  
git checkout -d "iss1"  

## git fetch
git fetch --all
git checkout origin/homeuse
git branch -b "iss1"
git checkout "homeuse"
git merge  "iss1"
>>>>>>> homeuse
