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
- git clone [URL]
- git commit -am "update comments" >> git push
- git fetch >> git status >> git pull
- .deployFiles.sh -k [yourpemkey] -h studyroom.click
- Live Server VS Code extensions --> to see what code looks like in browser
- startup: https://startup.studyroom.click


### Simon
- https://simon.studyroom.click
- ./deployWebsite.sh -k [yourpemkey]-h studyroom.click -s simon
- have a different file for each page and connect with links
- separate CSS file (or multiple if complex)
- may want to change html files when implement CSS
- use !important when overriding bootstrap
- to make rgb colors a different shade multiply by a fraction (darker)
- to make rgb colors a different tint find 255-original value and multiply that by a fraction (lighter)

### HTML
- basic structure to include:
  - DOCTYPE html
  - html lang
    - header --> meta charset, link css and javascript
    - body
- class: can be used by multiple elements; id: can only be used by one

### CSS
- add to html with style tag or link rel="stylesheet" href=filename
- use body to set background color (or image) and font for entire page
- top/bottom and left/right useful for moving elements around page
- save images without background as png to avoid adding white background
- add fonts
  - @font-face with elements font-family and src
  - @import url()

### JavaScript
- add to HTML with script tag or script src=filename
