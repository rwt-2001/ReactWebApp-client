import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from "./reducers/index"
import App from "./App";
import thunk from 'redux-thunk';
import "./index.css";

const store = configureStore({ reducer: reducers }, compose(applyMiddleware(thunk)));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);