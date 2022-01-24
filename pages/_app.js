import "../styles/globals.css";
import FlagProvider, { UnleashClient, InMemoryStorageProvider } from "@unleash/proxy-client-react";

const config = {
  "url": "",
  "clientKey": "",
  "appName": "",
  "projectName": "",
  "refreshInterval": "",
  "environment": "",
}

function MyApp({ Component, pageProps }) {
  console.log('toggles ====> ', pageProps.toggles);
  const ssrOption = process.browser ? {} : { fetch: fetch, storageProvider: new InMemoryStorageProvider() };
  const client = new UnleashClient({ ...config, ...ssrOption,  bootstrap: pageProps.toggles });
  return (<FlagProvider unleashClient={ client }>
    <Component {...pageProps} />
  </FlagProvider>)
}

export default MyApp;
