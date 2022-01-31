import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import { useVariant, UnleashClient, InMemoryStorageProvider, useUnleashContext  } from '@unleash/proxy-client-react';
import { useFlagsStatus } from '@unleash/proxy-client-react'
import styled from 'styled-components'
import { useEffect } from "react";

export default function Home() {
  const variant = useVariant('search');

  const { flagsReady, flagsError } = useFlagsStatus();
  const updateContext = useUnleashContext();
  const userId = '123'

  useEffect(() => {
    // context is updated with userId
    updateContext({ userId })
  }, [userId])

  console.log('Test log ====> ',{flagsReady, flagsError, variant});
  return (
    <div className={styles.container}>
      <div>{JSON.stringify(variant)}</div>
      <div>flagsReady : - {JSON.stringify(flagsReady)}</div>

      {!flagsReady && <div>Loading Component</div>}
      {flagsReady && <>Component to show after flag ready</>}
      

      <Link href="/About">
        <RedLink>Go to About page</RedLink>
      </Link>
    </div>
  );
}

const RedLink = styled.a`
  color: red;
`
const config = {
  "url": "",
  "clientKey": "",
  "appName": "",
  "projectName": "",
  "refreshInterval": 1000,
  "environment": "",
}

export async function getServerSideProps () {
  const unleash = new UnleashClient({
    ...config,
    fetch,
    storageProvider: new InMemoryStorageProvider(),
  })
  unleash.updateContext({ userId: '123' });

  await unleash.start()

  const toggles = unleash.getAllToggles()
  console.log('toggles server =====>' , toggles);

  return {
    props: {
      toggles
    }
  }
}
