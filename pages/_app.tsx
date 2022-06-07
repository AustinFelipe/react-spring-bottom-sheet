import '../docs/style.css'
import '../src/style.css'

import type { InferGetStaticPropsType } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { capitalize } from '../docs/utils'

export async function getStaticProps() {
  const [
    { version, description, homepage, name, meta = {} },
    { version: reactSpringVersion },
    { version: reactUseGestureVersion },
  ] = await Promise.all([
    import('../package.json'),
    import('@react-spring/web/package.json'),
    import('@use-gesture/react/package.json'),
  ])
  if (!meta['og:site_name']) {
    meta['og:site_name'] = capitalize(name)
  }

  return {
    props: {
      version,
      description,
      homepage,
      name,
      meta,
      reactSpringVersion,
      reactUseGestureVersion,
    },
  }
}

export type GetStaticProps = InferGetStaticPropsType<typeof getStaticProps>

export default function _AppPage({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
