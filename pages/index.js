import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import { useVariant } from '@unleash/proxy-client-react';
import { useFlagsStatus } from '@unleash/proxy-client-react'
import styled from 'styled-components'

export default function Home() {
  const variant = useVariant('search');
  const { flagsReady, flagsError } = useFlagsStatus();

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
