# Settlers of Catan

## Overview
- **Brief Description**: Overview at its core, Catan is a settlement-building game. You and up to three other players will compete to earn resources and construct buildings across a small island. You’ll be trading with other players to grab the resources you most need, and placing down new roads and settlements to earn Victory Points (VP).
- **Key Features**: Our version of online catan is a multi-player online video game based on the origional board game. It will feature up to four players, the ability to buy roads and settlements, as well as obtaining victory points. 

## Task
- **Objectives**: Develop a browser based, multiplayer game that emulates a popular card or board game, ensuring it is engaging for at least two players. The game must include user-friendly interfaces for game setup, real-time interaction between players, and a system for tracking scores and progress throughout sessions. Implement robust and secure connectivity features to support seamless, synchronous gameplay across different devices and networks.
- **Mission Statement**: We will build an accessible web application version of the board game Settlers of Catan by providing an intuitive, interactive, and enjoyable game that will provide players with  the opportunity to think strategically while also having fun and competing with friends and strangers. 

## Tech Stack | Architecture
<p>
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="50" alt="React">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="50" alt="TypeScript">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" width="50" alt="HTML5">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="50" alt="Express">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="50" alt="Node.js">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Touchicon-180.png" width="50" alt="Firebase">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" width="50" alt="AWS">
</p>

### Technologies Used
- **Frontend**: The game's frontend is developed using **TypeScript** and **React**. This combination offers a robust framework for building interactive UIs efficiently.
- **Backend**: The backend is powered by **TypeScript**, **Express**, and **Node.js**, providing a scalable server-side solution.
- **Database**: **Firebase** is used for real-time data handling, authentication, and frontend hosting services.
- **Hosting**: The server application is hosted on **AWS EC2**, ensuring reliable and scalable cloud computing.

### Architecture
The game architecture employs a client-server model where the **React** frontend communicates with an **Express** backend via RESTful APIs. The backend manages game logic, player data, and interactions with the **Firebase** database for real-time updates and state synchronization. The entire service is hosted on **AWS EC2**, providing robust scalability and performance. Below are some diagrams and links to further documentation on the architecture:
- **System Architecture Diagram**: (Link to diagram)
- **Codebase Structure Overview**: Client (Frontend), Server (Backend), Shared (Types)

This structure ensures a seamless and dynamic gaming experience, capable of handling multiple users with minimal latency.

## How to Play

### Online
Play Online (Link)

### Locally

```bash
git clone https://github.com/landenf/Software-Engineering-IV-Game.git
#Frontend
cd client
npm install
npm start
#Backend
cd server
npm install
npm start
```

## Demo
- Presentation and Video

## Contributors

[Landen Fogle](https://www.github.com/landenf) | [Drew Hall](https://www.github.com/SirFatredVIII) | [Elena Belashchenko](https://github.com/ebelashchenko2) | [Sarah Cunningham](https://www.github.com/scunningham8)

## Acknowledgments
-  Project apart of Raikes School of Computer Science course RAIK 284H
- Special thanks to Dr. Firestone and Teaching Assistants

## Version History
- **Changelog**: Version 1 (3/1/2024) | Version 2 (5/9/2024)

## License
- **Licensing Information**: MIT Lisense 
