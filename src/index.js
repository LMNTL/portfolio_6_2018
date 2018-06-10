import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route} from 'react-router-dom';

const routeChangeCallback = (prevRoute, nextRoute) => {
    console.log(nextRoute.current);
}

ReactDOM.render(
        <BrowserRouter onLeave={routeChangeCallback}>
            <Route path="/" component={App} />
        </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
