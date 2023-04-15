# Use library

## 🌟react-bootstrap
CSSフレームワークのbootstrapを利用するためのライブラリです．<br>
https://react-bootstrap.github.io/getting-started/introduction
~~~
yarn add react-bootstrap bootstrap@5.1.3
~~~
🚨App.tsxに下記を追記しないと使えません．
~~~
import 'bootstrap/dist/css/bootstrap.min.css';
~~~

## 🌟react-router-dom
Routingするために利用するライブラリです．<br>
最新のバージョン6を使います．<br>
https://reactrouter.com/docs/en/v6/getting-started/overview
~~~
yarn add react-router-dom@6
~~~
🚨バージョン5から変わったところがたくさんあります．下記を参考にしてください．<br>
https://dev.classmethod.jp/articles/react-router-5to6/

## 🌟firebase
Firebaseを利用するためのライブラリです．<br>
SDKのバージョン9を使います．

~~~
yarn add firebase
~~~

## 🌟react-google-maps/api
GoogleMapを表示させるために利用するライブラリです．下記を参考にしてください．<br>
https://dev.classmethod.jp/articles/launching-a-map-app-using-react-google-maps-api-locally/
~~~
yarn add @react-google-maps/api
~~~

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
