# Startup

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

# Notes

### Server:
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
- DNS = domain name system --> translates human readable domain names to IP addresses
  - A = address (IP)
  - CNAME = canonical name --> points a domain name to another domain


### Simon:
- https://simon.studyroom.click
- ./deployWebsite.sh -k [yourpemkey]-h studyroom.click -s simon
- have a different file for each page and connect with links
- separate CSS file (or multiple if complex)
- may want to change html files when implement CSS
- use !important when overriding bootstrap
- to make rgb colors a different shade multiply by a fraction (darker)
- to make rgb colors a different tint find 255-original value and multiply that by a fraction (lighter)

### HTML:
- basic structure to include:
  - DOCTYPE html
  - html lang
    - header --> meta charset, link css and javascript
    - body
- class: can be used by multiple elements; id: can only be used by one
- div = division element
- DOM = document object model; defines the HTML elements as objects, the properties of all HTML elements, the methods access all HTML methods, and the events for all HTML methods
- hyperlink = a href=url

### CSS:
- add to html with style tag or link rel="stylesheet" href=filename
- use body to set background color (or image) and font for entire page
- top/bottom and left/right useful for moving elements around page
- save images without background as png to avoid adding white background
- add fonts
  - @font-face with elements font-family and src
  - @import url()
- box model = (outside) margin, border, padding, content (inside)

### JavaScript:
- add to HTML with script tag or script src=filename
- functions
  - function Add(x, y)
  - let add = function a(x, y)
  - var add = (x, y) => x+y
- <img src="https://tec-refresh.com/wp-content/uploads/2021/03/regex-cheatsheet.jpg" width="450" height="350">
- JSON = JavaScript Object Notation
  - data in name/value pairs
  - data separated by commas
  - curly braces hold objects
  - square brackets hold arrays
  - double quotes
- console commands
  - chmod +x deploy.sh = makes a script executable
  - ssh deploy.sh = a universal deployment script that makes it easy for you to deploy your code, files, configurations, etc. to multiple servers via ssh (secure shell)
  - ls -la deploy.sh = lists files and directories; -l includes extra info and -a includes hidden files
  - sudo deploy.sh =  super user do; run programs with the security privileges of another user

### Web Service
- use port 3000 for Simon and port 4000 for startup
- Simon: convert to a service
  1. move deliverable code files (html, js, css, images/icons, asserts) to a sub-directory "public"; app.use(express.static('public'));
  2. run npm init -y within project directory
  3. modify .gitignore to ignore node_modules
  4. npm install express
  5. create index.js (entry point node.js will call when run web service)
  6. add basic js code needed to host the app static content and desired endpoints
  7. modify app code to make service endpoint requests to HTTP service code
- ./deployService.sh -k [yourpemkey]-h studyroom.click -s simon

### Database
- save data
- MongoDB
- protect credentials
  - set environment variables in production environment (ssh, sudo, etc...)
  - set environment variables in development environment (system environment variables)
- npm init -y, npm install mongodb. node main.js
- Simon: create a database cluster, protect credentials, stores high scores, use deployService script

### Account Creation/Login
- Endpoints: create authentication endpoint (takes email and password, returns cookie containing authentication token and user ID, checks if email already exists), login authentication endpoint (takes email and password, returns cookie containing authentication token and user ID, checks if email exists and if password is bad), GetMe endpoint (use authentication token stored in cookie to look up and return info about the authenticated user, checks if token and user exist)
- Web service: npm init -y, npm install express cookie-parser mongodb uuid bcrypt, node main.js (or index.js, etc...)
Handling requests: read the credentials from the body of the HTTP request, parse the request automatically into a JS object where you can read the amial and password directly out of, check for a user with that email address
- database: store users in Mongo, getUser and creatUser functions
- generating authentication tokens: use the uuid package (Universally Unique Identifier) >> creates a hard to guess, random, unique ID
- securing passwords: never store the actual password >> hash it, to validate compare the hasehd login password to our stored hash, bcrypt package
- passing authentication tokes: 

### React
- components: modularize functionality, code reuse, generate user interface (render)
- reactivity: making the UI react to changes in user input/data
