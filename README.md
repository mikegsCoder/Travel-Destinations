# Travel Destinations

:dart:  My project for the [ReactJS](https://softuni.bg/trainings/3727/reactjs-june-2022) course at SoftUni (June 2022) deployed on Firebase 👉 [Travel Destinations](https://travel-destinations-88814.firebaseapp.com/)

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
- Default users:
  - email: peter@abv.bg with password: 123456
  - email: john@abv.bg with password: 123456
- Some more features:
  - implemented Error Boundary;
  - implemented Private and Guarded routes;
  - implemented Carousel with React Bootstrap;
  - implemented geolocations with React Leaflet;
  - implemented data validation for Register, Create Destination, Edit Destination, Create Comment and Edit Comment forms;
  - implemented notification providers;
  - implemented comments list pagination;
  - implemented 404 (Not Found) component;
  - responsive design.

## :hammer_and_wrench: Technologies and Tools used:

- ReactJS
- React Router v6
- React Bootstrap
- React Leaflet
- JavaScript
- HTML 5
- CSS
- Font Awesome

## :gear: Application Backend:

 - [SoftUni practice server](https://github.com/softuni-practice-server/softuni-practice-server) populated with data for Travel Destinations application.
 - Developed by [Viktor Kostadinov](https://github.com/viktorpts)
 - Deployed on Heroku 👉 [Admin Panel](http://travel-destinations-server.herokuapp.com/admin/)

## :framed_picture: Screenshot - Destination Carousel:

![TravelDestinations-AllDestinations](https://travel-destinations-88814.firebaseapp.com/images/screenshots/DestinationCarousel.jpg)

## :framed_picture: Screenshot - Destination Details:

![TravelDestinations-DestinationDetails](https://travel-destinations-88814.firebaseapp.com/images/screenshots/DestinationDetails.jpg)

## :framed_picture: Screenshot - Destination Geolocation:

![TravelDestinations-DestinationLocation](https://travel-destinations-88814.firebaseapp.com/images/screenshots/DestinationLocation.jpg)

## :framed_picture: Screenshot - Create Destination with Data Validation:

![TravelDestinations-CreateDestination](https://travel-destinations-88814.firebaseapp.com/images/screenshots/CreateDestination.jpg)

## :framed_picture: Screenshot - Comments List Paginated:

![TravelDestinations-CommentsList](https://travel-destinations-88814.firebaseapp.com/images/screenshots/CommentsList.jpg)

## :framed_picture: Screenshot - User Profile Statistics:

![TravelDestinations-UserProfileStatistics](https://travel-destinations-88814.firebaseapp.com/images/screenshots/UserProfileStatistics.jpg)

## :framed_picture: Screenshot - 404 (Not Found):

![TravelDestinations-NptFound](https://travel-destinations-88814.firebaseapp.com/images/screenshots/404.jpg)

 ## License:

This project is licensed under the [MIT License](LICENSE).