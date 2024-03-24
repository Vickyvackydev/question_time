# QUESTION CRUD WEB APP TEST

This is a project for a test interview, git is initialised in this project, more below

## INSTALLATION

1. Clone the respository
2. Install the depencies with "npm install"

## USAGE

1. Start the development server with "npm run dev"
2. Open your browser and navigate to "http://localhost:3000"

## TECHNOLOGIES USED

1. React.js
2. Next.js
3. Framer-Motion
4. Axios
5. Headless Ui
6. jest testing library

## HOW THE PROJECT WORKS

- A crud application, the API integration is handled using "axios" library, that is used to fetch data faster from the endpoint.
- We handle token for any user that enters the site, for the token handles each operation in the site.
- And for every user that it's token isn't saved in the browser's storage will be routed back to enter their token using their email, the token of a user is saved in the local storage.
- Redux is used for more major complex web apps, i made use of the "useContext" hooks, an inbuilt hook from react. This hook handles the state of the token and the storage of any user's token to know when a user token is saved for a new user or a returning one.
- The token is handled in all operation but i have made it easier to get the token and it has being fetched, for any contribution the token can always be called with the "useToken" hook i created from "useContext".
- Questions fetched from the data are displayed not with the "map" function instead it is done with the "Object entries" function javascript which gave a tough time but it was later done.
- In conclution little features with some ideas of mine were added to this wonderful project.
- Token for any user registered is stored in the user's browser's localstorage for immediate entrance when next the site is visited by the returning user.

## CONTRIBUTING

1. Fork the respository
2. Create a new branch "git checkout branch feature/new-feature"
3. Make Your changes and commit them "git commit -m" and add new commit "new commit"
4. Push to the branch "git push origin feature/new feature"
5. create new Pull Request

## TESTING

- jest testing library, is the react library used to test for this project.
- run "npm test" to trigger jest testing for this project
- Testing will only run for the homepage, to signify that jest is actually runing, and test is also made for the question api, to fetch the questions data. jest status of passed detects that the data has being fetched successfully.
- in the test file for the api, a token was fetched and stored in an env variable to test for the fetch questions API.

## API ERROR

- the api only accepts token to fetch data from the email set as example and also ones personal lucky mail that was made achieve. so for it test please make use of "email@email.com" to fetch your own token and retrieve data.
