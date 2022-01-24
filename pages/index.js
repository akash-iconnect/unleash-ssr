import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import { useVariant, UnleashClient, InMemoryStorageProvider, useUnleashContext  } from '@unleash/proxy-client-react';
import { useFlagsStatus } from '@unleash/proxy-client-react'
import styled from 'styled-components'
import { useEffect } from "react";

export default function Home() {
  const variant = useVariant('search-algo');
  const { flagsReady, flagsError } = useFlagsStatus();
  const updateContext = useUnleashContext();
  const userId = '123'

  useEffect(() => {
    // context is updated with userId
    updateContext({ userId })
  }, [userId])
  return (
    <div className={styles.container}>
      <div>{JSON.stringify(variant)}</div>
      <div>flagsReady : - {JSON.stringify(flagsReady)}</div>

      {!flagsReady && <div>Loading</div>}
      

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
  "refreshInterval": "",
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

  return {
    props: {
      toggles
    }
  }
}
