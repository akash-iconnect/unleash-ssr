import "../styles/globals.css";
import FlagProvider from "@unleash/proxy-client-react";
import fetch from 'node-fetch';

const config = {
  url: 'https://HOSTNAME/proxy',
  clientKey: 'PROXYKEY',
  refreshInterval: 15,
  appName: 'your-app-name',
  environment: 'dev',
  fetch
};

function MyApp({ Component, pageProps }) {
  return (<FlagProvider config={config}>
    <Component {...pageProps} />
  </FlagProvider>)
}

export default MyApp;
