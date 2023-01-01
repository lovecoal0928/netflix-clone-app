import { signInAnonymously, signInWithPopup } from "firebase/auth"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from "../hooks/useAuth"

interface Inputs {
  email: string
  password: string
}

const login = () => {
  
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()
  
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

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
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6
          md:mt-0 md:max-w-md md:px-14"
      >
        <h1>Sign In</h1>
        <div className="space-y-4">
          <label htmlFor="email" className="inline-block w-full">
            <input
              {...register('email', { required: true })}
              type="email" placeholder="Email" id="email"
              className="input"
            />
            {/* エラーメッセージ */}
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label htmlFor="password" className="inline-block w-full">
            <input
              {...register('password', { required: true })}
              type="password" placeholder="PassWord" id="password"
              className="input"
            />
            {/* エラーメッセージ */}
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}>
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={()=> setLogin(false)}
          >
            Sign up now!
          </button>
        </div>
      </form>
    </div>
  )
}

export default login