import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import * as Icon from 'react-bootstrap-icons'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    // ヘッダースクロールアニメーション
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        // 必要なとき以外はイベントを切る
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <div className="flex items-center space-x-2 md:space-x-10">
            {/* ヘッダーロゴ */}
            <Image
                src="/netflix-logo.png"
                width={100}
                height={100}
                alt="netflix logo"
                className="cursor-pointer object-contain"
            />

            {/* ページナビゲーション */}
            <ul className="hidden space-x-4 md:flex">
                <li className="headerLink">Home</li>
                <li className="headerLink">TV Shows</li>
                <li className="headerLink">Movies</li>
                <li className="headerLink">New & Popular</li>
                <li className="headerLink">My list</li>
            </ul>
        </div>

        {/* アカウントナビゲーション */}
        <div className="flex items-center space-x-4 text-sm font-light">
          <Icon.Search className="hidden h-6 w-6 sm:inline"/>
          <p className="hidden lg:inline">Kids</p>
          <Icon.BellFill className="h-6 w-6"/>

          <Link href="/account">
            <Image
                src="/account-icon.png"
                width={30}
                height={30}
                alt="account icon"
                className="cursor-pointer rounded"
            />
          </Link>
        </div>
    </header>
  )
}

export default Header