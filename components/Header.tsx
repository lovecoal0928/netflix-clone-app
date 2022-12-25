import Image from "next/image"

const Header = () => {
  return (
    <header>
        <div className="flex items-center space-x-2 md:space-x-10">
            <Image
                src="/netflix-logo.png"
                width={100}
                height={100}
                alt="netflix logo"
                className="cursor-pointer object-contain"
            />

            <ul className="hidden space-x-4 md:flex">
                <li className="headerLink">Home</li>
                <li className="headerLink">TV Shows</li>
                <li className="headerLink">Movies</li>
                <li className="headerLink">New & Popular</li>
                <li className="headerLink">My list</li>
            </ul>
        </div>
        <div></div>
    </header>
  )
}

export default Header