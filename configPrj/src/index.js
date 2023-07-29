
import React from 'react'
import ReactDOM from "react-dom/client";
// import ReactDOMServer from "react-dom/server";
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { NavigationContainer } from '@react-navigation/native';
// import SingleProduct from './views/client/Home';

// console.log(ReactDOMServer.renderToString(
//   <NavigationContainer>
//     <SingleProduct />
//   </NavigationContainer>
// ));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals();




