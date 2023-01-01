import Head from "next/head"
import Image from "next/image"
import { useState } from "react"

const login = () => {
  
  const [login, setLogin] = useState(false)

  return (
    <div className="relative flex h-screen w-full flex-col bg-black
      md:items-center md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Login - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/login-bg-large.jpg"
        fill
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="login bg"
      />
      
      <Image
        src="/netflix-logo.png"
        width={150}
        height={150}
        alt="netflix logo"
        className="absolute left-4 top-4 cursor-pointer object-contain
          md:left-10 md:top-6"
      />

      <form
        action=""
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6
          md:mt-0 md:max-w-md md:px-14"
      >
        <h1>Sign In</h1>
        <div className="space-y-4">
          <label htmlFor="email" className="inline-block w-full">
            <input
              type="email" placeholder="Email" id="email"
              className="input"
            />
          </label>
          <label htmlFor="password" className="inline-block w-full">
            <input
              type="password" placeholder="PassWord" id="password"
              className="input"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold">
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?{' '}
          <button className="text-white hover:underline">
            Sign up now!
          </button>
        </div>
      </form>
    </div>
  )
}

export default login