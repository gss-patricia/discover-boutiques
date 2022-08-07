import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const BoutiquesLocationPage = dynamic(() => import('./boutiquesLocationPage'), { ssr: false })

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <div>
          <BoutiquesLocationPage />
        </div>
      </main>
    </div>
  )
}

export default Home
