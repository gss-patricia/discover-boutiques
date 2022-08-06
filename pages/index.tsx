import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

const FullMap = dynamic(() => import('../src/components/map/FullMap'), { ssr: false })

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <div>
          <FullMap />
        </div>
      </main>
    </div>
  )
}

export default Home
