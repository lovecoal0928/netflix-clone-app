import Image from "next/image"
import { Movie } from "../typings"

interface Props {
    // for firebase
    // movie: Movie | DocumentData
    movie: Movie
}

const Thumbnail = ({movie}: Props) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer
        transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image
            src={`http://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
            fill
            className="rounded-sm object-cover md:rounded"
            alt=""
        />
    </div>
  )
}

export default Thumbnail