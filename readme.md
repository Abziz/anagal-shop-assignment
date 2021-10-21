# Shop Project - Anagal

To spin up the app you should cd into server/client and run npm install and npm start.

`cd server && npm install && npm start`
`cd client && npm install && npm start`

MongoDB connection URI can be found/replaced in the `.env` file and there's a seed script for products if needed.

The client uses axios for http fetching, and tailwind css for ui.

didn't finish the bonus task in time (could only work on the assignment for 1 day), allthough most of the backend for authentication and cart is written.

did not use a global state management as the application was small and could be done cleanly with react context api.

all components are functional components using hooks api.

cart for unauthenticated users is saved to localstorage after each item addition.




