import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import * as Icon from 'react-bootstrap-icons'
import { Movie } from '../typings'
import { modalState, movieState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({netflixOriginals}: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])
  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
        <div className='absolute top-0 left-0 -z-10 h-[95vh] w-full'>
            <Image
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              fill
              objectFit='cover'
              alt=''
            />
        </div>

        <h1 className='text-2xl md:text-4xl lg:text-7xl font-bold'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className='max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>{movie?.overview}</p>

        <div className='flex space-x-3'>
          {/* 動画再生モーダル */}
          <button className='bannerButton bg-white text-black'>
            <Icon.PlayFill className='h-4 w-4 text-black md:h-7 md:w-7' />
            PLAY
          </button>
          {/* 動画詳細モーダル */}
          <button
            className='bannerButton bg-gray-100/50'
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}>
            More Info
            <Icon.InfoCircleFill className='h-4 w-4 md:h-7 md:w-7' />
          </button>
        </div>
    </div>
  )
}

export default Banner