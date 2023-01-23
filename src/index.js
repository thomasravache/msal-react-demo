import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from './App';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
    auth: {
        clientId: '594c06c5-c1ff-4142-84a2-0c00d48d04df',
        authority: 'https://login.microsoftonline.com/e30a715f-c014-463a-89ac-9f54d86cd93d',
        redirectUri: '/',
    }
});

pca.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log(event.payload);
        pca.setActiveAccount(event.payload.account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca} />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
