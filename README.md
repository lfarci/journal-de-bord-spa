# Journal de bord web client
This project is a single page application inteded to provide a web client for the Journal de bord project. It is developed using React and TypeScript.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
### Configuration
This web client is published on Netlify. This section focuses on this platform. The configuration is easy. Netlify documentation explains how it is done right [here](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables).

## Development
### Configuration
#### How to configure
```
# Be sure to set your working directory to the project root
cd <project directory>

# .env.example is a template for the .env file
cp .env.example .env

# Edit the .env file and set the variables values
vi .env
```

#### Variables
- ```REACT_APP_CLIENT_ID```: is the identifier of this web client registered in your authorization server.
- ```REACT_APP_CLIENT_SECRET```: is the credentials of this web cliend registered in your authorization server.
- ```REACT_APP_AUTH_SERVER_TOKEN_URI```: is the authorization server endpoint that provide this client with an access token.
- ```REACT_APP_AUTH_SERVER_LOGIN_URI```: is the authorization server endpoint that provide this client with a login page.
- ```REACT_APP_REDIRECT_URI```: is the location URI where this client user will be redirected after login.

The custom environment variables are set following the [React documentation](https://create-react-app.dev/docs/adding-custom-environment-variables/). Their value can be accessed as follows `process.env["VARIABLE_NAME"]`.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

##