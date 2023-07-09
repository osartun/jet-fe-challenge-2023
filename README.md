# JET Frontend Challenge

## Demo

https://github.com/osartun/jet-fe-challenge-2023/assets/1381730/e0d7fd05-2ff8-4b62-bdb6-b325e1e14a17

## Notes

* **Note**: The server side is a fork from the original repo which you can find at: [osartun/scoober-fe-challenge-starter](https://github.com/osartun/scoober-fe-challenge-starter). It contains [some bug fixes and an upgrade of `socket.io`](https://github.com/takeaway/scoober-fe-challenge-starter/compare/master...osartun:scoober-fe-challenge-starter:master).
* Although I did make changes to the server side I focused on the client side / front end. For a production-ready app more time should be invested on the server side. For example…
  * To validate the inputs coming from the client
  * To test the game's logic
  * To do proper QA and fix the remaining bugs which I didn't invest time in fixing
* Tech decisions
  * I used Gatsby for this application as I have lots of experience with it and therefore it was the fastest way for me to bootstrap a project like this. It included most of the required technologies out of the box.
  * I didn't spend time setting up a CSS pre / post processor (like Sass or something similar). So, I'm using native CSS but modularized through CSS modules.
  * In the interview it was said that using Redux as the state management tool was not mandatory. However, I considered it appropriate and used it nonetheless.

## Setup

### Server side

1. Clone the server side fork from [osartun/scoober-fe-challenge-starter](https://github.com/osartun/scoober-fe-challenge-starter)
1. Follow its setup commands (they haven't changed from those in the original repo)

### Client side

1. Clone this repository
1. Install the dependencies with `npm install`
1. Make sure that the URLs in `.env` match the ones from the server side, edit them if necessary
1. Create a build and serve it with `npm run build && npm run serve`. Alternatively, start a dev server with `npm run develop`
1. Navigate to the URLs posted in the logs (http://localhost:9000/ or http://localhost:8000/)
