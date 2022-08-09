# Travel Destinations

:dart:  My project for the [ReactJS](https://softuni.bg/trainings/3727/reactjs-june-2022) course at SoftUni (June 2022). This is a Web application where you can share the best travel destinations you have visited and to browse such destinations shared by other users. Each destination has title, description, image URL and geolocation. The project is deployed on Firebase.

## 🔗 **Link to the project:**
&nbsp;&nbsp;&nbsp;&nbsp;**[Travel Destinations](https://travel-destinations-88814.firebaseapp.com/)**

## :arrow_forward: Getting Started:

1. Clone the repo
   ```sh
   git clone https://github.com/mikegsCoder/Travel-Destinations.git
   ```
2. Open Visual Studio Code in the "client" folder and open the Terminal
   ```sh
   View -> Terminal
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the project (by default this project uses remote server deployed on Heroku)
   ```sh
   npm start
   ```
5. If you want to use the local server:
   ```sh
   1. Open constants.js (location: client/src/constants/)
   2. Comment the baseUrl constant, related to the remote server.
   2. Uncomment the baseUrl constant, related to the local server.
   ```
6. Go to the "server" folder
   ```sh
   cd server
   ```
7. Start the server
   ```sh
   node server.js
   ```

## :information_source: Application Functionality:

- Guest visitors can: 
  - browse all destinations;
  - browse recent destinations;
  - browse destinations by category;
  - view destination details;
  - view comments for the destination;
  - view destination geolocation. 
- Logged in users can:
  - browse his own destinations; 
  - create new destinations;
  - edit his own destinations;
  - delete his own destinations;
  - like destination created by other users (only once per destination);
  - create comments for all destinations with no limit on created comments per destination;
  - edit his own comments;
  - delete his own comment;
  - view profile statistics by clicking on his email on the header.  
- Some more features:
  - implemented Error Boundary;
  - implemented Private and Guarded routes;
  - implemented Carousel with React Bootstrap;
  - implemented geolocations with React Leaflet;
  - implemented data validation for Register, Create Destination, Edit Destination, Create Comment and Edit Comment forms;
  - implemented notification providers;
  - implemented comments list server side pagination;
  - implemented 404 (Not Found) component;
  - responsive design.

## 🧪 Test Accounts
&nbsp;&nbsp;&nbsp;&nbsp;Email: **peter@abv.bg**  
&nbsp;&nbsp;&nbsp;&nbsp;Password: **123456**  

&nbsp;&nbsp;&nbsp;&nbsp;Email: **john@abv.bg**  
&nbsp;&nbsp;&nbsp;&nbsp;Password: **123456** 

## :hammer_and_wrench: Technologies and Tools used:

- ReactJS
- React Router v6
- React Bootstrap
- React Leaflet
- JavaScript
- HTML 5
- CSS
- Font Awesome