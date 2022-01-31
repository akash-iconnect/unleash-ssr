import "../styles/globals.css";
import FlagProvider, { UnleashClient, InMemoryStorageProvider } from "@unleash/proxy-client-react";

const config = {
  "url": "",
  "clientKey": "",
  "appName": "",
  "projectName": "",
  "refreshInterval": 1000,
  "environment": "",
}

function MyApp({ Component, pageProps }) {
  const ssrOption = process.browser ? {} : { fetch: fetch, storageProvider: new InMemoryStorageProvider() };
  const client = new UnleashClient({ ...config, ...ssrOption,  bootstrap: pageProps.toggles });
  client.updateContext({ userId: '123' });

  return (<FlagProvider unleashClient={ client }>
    <Component {...pageProps} />
  </FlagProvider>)
}

export default MyApp;
