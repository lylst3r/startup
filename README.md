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
- passing authentication tokens: pass generated authentication token to the browser when the login endpoint is called, get it back on subsequent requests, cookie-parser package (middleware for cookies)
  - httpOnly >> tells the browser to not allow JS running on the browser to read the cookie
  - secure >> requires HTTPS to be used when sending the cookie back to the server
  - sameSite >> will only return the cookie to the domain that generated it
- login endpoint: get hashed password from the db, compare to the provided password using bcrypt.compare, if successful set the authentication token in the cookie
- GetMe endpoint: get the user object from the db by querying on the authentication token, check for authentication token and user with that token
- Simon 
  - Authorization UI: login UI in files in the public folder, when index.html is loaded an anonymous function in login.js determines if the user is already authenticated and uses that state to hide/show login controls, when user logs in/out or creates credentials te service endpoints are called
  - Authorization cookie: uses a secure cookie to store the authorization token for an authenticated user, use of secure httpOnly and sameSite, when a user is logged in the cookie is added, when a user makes a secure request the cookie is checked, when the user logs out the cookie is removed
  - Application service endpoints: contained in index.js, authCreate, authLogin, authLogout, userGet, work with the db to store and get credentials and update the authorization cookie, secureApiRouter (Express router) wraps the existing router to add middleware function that verifies that the authorization cookie is valid before passing the request to endpoints
  
### WebSocket
- peer to peer connection, either party can efficiently send data at any time
- only between two parties so to facilitate a conversation for a group: the server must act as the intermediary (each person connects to the server and the server forwards messages among everyone)
- conversation: ws package, automatically upgrade HTTP connections if the request has a connection: Upgrade header, when a connection is detected it calls the server's on connection callback, send function (send messages), onmessage function (receive messages)
- debugging the server: go to directory, npm init -y, npm install ws, set breakpoints (VS Code), run debugger (F5)
- debugging the client: Chrome debugger (F12), Network tab and select the HTTP message generated by the execution of the code, messages tab, send a message to the server >> socket.send('message')
- CHAT CLIENT: HTML (input for the name and creating messages, element to display messages sent/received), JS (creating/displaying messages, manages the WebSockets to connect, send, and receive messages)
- DOM interaction: disable chat controls if the name is empty, function to update the displayed messages by selecting the element with the chat-text ID and appending the new message to its HTML, send the message over the socket by selecting the DOM element with the new-msg ID and adding a listener that watches for the Enter keystroke, calls sendMessage function (selects text out of the new-msg element and the name out of the my-name element and sends over the WebSocket, value of the message element cleared so ready for next message)
- WebSocket connection: window.location.protocol (if it is non-secure HTTP set WebSocket protocol to be non-secure WebSocket (ws) otherwise use secure WebSocket (wss)), connect the WebSocket to the same location that we loaded the HTML by referencing the window.location.host variable, notify the user that the chat is ready by listening to the onopen event and appending text to the display using the appendMsg function (displays messages received), if the WebSocket closes display that to user and disable controls
- CHAT SERVER: runs the web service, serves up the client code, manages WebSocket connections, and forwards messages from peers
- web service: established using Express application, serve up client HTML, CSS, and JS files using the static middleware
- WebSocket server: upgrade to WebSocket by specifying the noServer option whe creating the WebSocketServer and then handling the upgrade notification that occurs when a client requests the upgrade of the protocol from HTTP to WebSocket
- forwarding messages: use the connection, message, and close events to forward messages between peers, insert an object representing the connection into a list of all connections from the chat peers, when a message is received loop through the peer connections and forward it on to everyone except the peer who initiated the request, remove a connection when it is closed
- keeping connections alive: connection will eventually close if no data is sent across, send a ping message to see if the peer is still there and receive pong responses to indicate the affirmative, setInterval (sends out a ping every 10 seconds to each of our peer connections and cleans up any connections that did not respond to our previous ping), in connection handler listen for pong response and mark the connection as alive or any connection that did not response will remain in the not alive state and get cleaned up next pass
- Simon: display notifications between users, install the ws NPM package, attach a WebSocket listener to the HTTP server through the PeerProxy class (contains the protocol to upgrade from HTTP to WebSocket, tracks new WebSocket connections, passes (or proxies) requests between connections, and implements ping/pong to keep connections alive), public/play.js (functions for connecting, broadcasting, receiving, and displaying events using WebSocket)

### React
- components: modularize functionality, code reuse, generate user interface (render)
- reactivity: making the UI react to changes in user input/data
- Simon: 
  1. reorganize Simon
  2. commit this version as the starting place (makes it easy to revert if necessary)
  3. create template React application (npx create-react-app template-react) >> basic configuration and template React application code
  4. clean up template code (uninstall unused NPM packages, delete unnecessary create-react-app files, rename js JSX files have jsx extension, replace favicon.io with the Simon icon, update manifest.json, clean up the index.html)
  5. move template files to Simon
  6. convert to React Bootstrap
  7. populat App.jsx
  8. create view components
  9. create the router
  10. convert to React components
  11. set up to debug
  12. refractor play.jsx into simonGame.jsx, simonButton.jsx, and players.jsx
  13. refractor components to take advantage of React specific functionality and to create sub-components
  14. move webSocket code from play.jsx to gameNotifier.js

### backend startup
- web server: converted to web server, called third party service endpoints (quote on login page)
- database: save todo list items
- account creation/login
- websocket: 
