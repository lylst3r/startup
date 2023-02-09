# startup

Have you ever been distracted while studying and wished there was a site that helped you stay focused and allowed you to manage multiple tasks from the same place? Study Room gives you a virtual room that you can decorate to your liking which gives you multiple features to help you study. There is a to-do list and a timer, and you can add a music playlist and friends to keep you accountable.

<img src="https://user-images.githubusercontent.com/40433574/216184136-420f4b89-0c51-4729-bb92-129cbf18c49e.PNG" width="450" height="350" align="right">

<img src="https://user-images.githubusercontent.com/40433574/216184122-539ad270-98b3-41f6-b913-369976c68c6c.PNG" width="450" height="350">

### Key Features:
- Secure login over HTTPS
- To-do list
- Add own music playlist
- Add friends to study together
- Take timed breaks
- Custom decorations

### Server
- IP Address: 3.135.174.144
- remote shell command: ssh -i [key pair file --> pink laptop] ubuntu@[ip address]
- domain name: studyroom
- https://studyroom.click
- git clone <URL>
- git commit -am "update comments" >> git push
- git fetch >> git status >> git pull
- .deployFiles.sh -k <yourpemkey> -h studyroom.click


### Simon
- https://simon.studyroom.click
- ./deployWebsite.sh -k <yourpemkey> -h studyroom.click -s simon
- have a different file for each page and connect with links
