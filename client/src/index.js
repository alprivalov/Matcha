import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root')

const ReactRoot = ReactDOM.createRoot(root)
ReactRoot.render(<App />,)
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


// if (import.meta.hot) {
//   import.meta.hot.accept
// }