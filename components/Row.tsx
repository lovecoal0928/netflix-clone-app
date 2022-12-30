import React from 'react'
import { Movie } from '../typings'
import * as Icon from 'react-bootstrap-icons'
import Thumbnail from './Thumbnail'

interface Props {
    title: string,
    movies: Movie[]
}

const Row = ({title, movies}: Props) => {
  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
        <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5]
            transition duration-200 hover:text-white md:text-2xl'
        >{title}</h2>
        <div className='relative group md:-ml-2'>
            <Icon.ChevronLeft
                className='absolute top-0 left-0 z-40 m-auto h-9 w-9 cursor-pointer
                    transition hover:scale-125 group-hover:opacity-100'
            />
            <div className='flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2'>
                {movies.map((movie) => (
                    <Thumbnail key={movie.id} movie={movie} />
                ))}
            </div>
            <Icon.ChevronRight
                className='absolute top-0 left-0 z-40 m-auto h-9 w-9 cursor-pointer
                    transition hover:scale-125 group-hover:opacity-100'
            />
        </div>
    </div>
  )
}

export default Row