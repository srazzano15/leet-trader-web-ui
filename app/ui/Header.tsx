'use client'
import { useState, useEffect } from "react"
import Navigation from "./Navigation"
import Image from "next/image"
import logoImage from '../assets/images/png/logo-no-background.png'
import { logoutUser } from "../api/auth"
import { validateRefreshToken } from "../api/session"

const Header = () => {
    const [navOpen, setNavOpen] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    useEffect(() => {
        return validateRefreshToken() ? setIsAuthenticated(true) : setIsAuthenticated(false)
    }, [])

    if (!isAuthenticated) return null
    
    return (
        <header className="bg-white col-span-3 p-3 w-screen shadow-md md:shadow-sm sticky z-10 top-0">
            <div className="grid grid-cols-3 justify-center">
                <a href="/" className="text-xl col-start-1 md:col-start-2 md:justify-self-center">
                    <Image 
                        src={logoImage}
                        width={150}
                        height={0}
                        alt="Leet Trader"
                    />
                </a>
                <button 
                    className="text-slate-600 col-start-3 font-extralight transition w-10 text-4xl justify-self-end rounded hover:bg-slate-200"
                    onClick={() => setNavOpen(!navOpen)}
                >&equiv;</button>
            </div>
            <Navigation isOpen={navOpen}/>
        </header>
    )
}

export default Header