import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import ReactPlayer from 'react-player/lazy'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Element, Genre } from '../typings'

const Modal = () => {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState("")
    const [genres, setGenres] = useState<Genre[]>([])
    const [playing, setPlaying] = useState(true)
    const [muted, setMuted] = useState(true)

    useEffect(() => {
        if (!movie) return

        const fetchMovie = async() => {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            )
                .then((response) => response.json())

            if (data?.videos) {
                const index = data.videos.results.findIndex((element: Element) => element.type === "Trailer")
                setTrailer(data.videos?.results[index]?.key)
            }
            if (data?.genres) {
                setGenres(data.genres)
            }
        
        }
        fetchMovie()
    },[movie])

    const handleClose =() => {
        setShowModal(false)
    }

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
            <>
                <button
                    onClick={handleClose}
                    className="modalbutton
                        absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]
                        hover:bg-[#181818]"
                >
                    <Icon.X className='h-6 w-6'/>
                </button>
                <div className='relative pt-[56.25%]'>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{position:'absolute', top:'0', left:'0', background:'#181818'}}
                        playing={playing}
                        muted={muted}
                    />
                    <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                        <div className='flex space-x-2'>
                            <button
                                onClick={() => setPlaying(!playing)}
                                className='flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black border-none
                                    transition hover:bg-[#e6e6e6]'
                            >
                            {playing ? (
                                <Icon.PauseFill className='h-9 w-9 text-black' />
                            ): (
                                <Icon.PlayFill className='h-9 w-9 text-black' />
                            )}PLAY
                            </button>
                            <button className='modalbutton'>
                                <Icon.Plus className='h-12 w-12' />
                            </button>
                            <button className='modalbutton'>
                                <Icon.HandThumbsUp className='h-7 w-7' />
                            </button>
                        </div>
                        <button className='modalbutton' onClick={() => setMuted(!muted)}>
                            {muted ? (
                                <Icon.VolumeMute className='h-7 w-7' />
                            ): (
                                <Icon.VolumeUp className='h-7 w-7' />
                            )}
                        </button>
                    </div>
                </div>
                <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
                    <div className='space-y-6 text-lg'>
                        <div className='flex items-center space-x-2 text-sm'>
                            <p className='font-semibold text-green-400'>{movie!.vote_average * 10}% Match</p>
                            <p className='font-light'>{movie?.release_date || movie?.first_air_date}</p>
                            <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>HD</div>
                        </div>
                        <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
                            <p className='w-5/6'>{movie?.overview}</p>
                            <div className='flex flex-col space-y-3 text-sm'>
                                <div>
                                    <span className='text-[gray]'>Genre: </span>
                                    {genres.map((genre) => genre.name).join('、')}
                                </div>
                                <div>
                                    <span className='text-[gray]'>Language:</span>
                                    {movie?.original_language}
                                </div>
                                <div>
                                    <span className='text-[gray]'>Total Voted:</span>
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal