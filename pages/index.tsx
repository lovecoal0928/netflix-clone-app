import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className='relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]
      lg:h-[140vh]'
    >
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {/* ヘッダー */}
        <Header />
        <main> 
          {/* バナー */}
          <Banner />
          <section>
            {/* 再生リスト */}
            {/* 再生リスト */}
            {/* 再生リスト */}
            {/* 再生リスト */}
            {/* 再生リスト */}
            {/* 再生リスト */}
            {/* 再生リスト */}
          </section>
        </main>
        {/* モーダル */}
    </div>
  )
}

export default Home
