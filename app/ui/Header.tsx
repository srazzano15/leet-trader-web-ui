'use client'
import { useState } from "react"
import Navigation from "./Navigation"
const Header = () => {
    const [navOpen, setNavOpen] = useState<boolean>(false)
    return (
        <header className="bg-white col-span-3 p-5 w-screen shadow-md md:shadow-sm sticky z-10 top-0">
            <div className="grid grid-cols-3 justify-center">
                <span className="text-xl col-start-1 md:col-start-2 md:justify-self-center">Stock Trader</span>
                <button 
                    className="col-start-3 justify-self-end mr-5"
                    onClick={() => setNavOpen(!navOpen)}
                >Menu</button>
            </div>
            <Navigation isOpen={navOpen}/>
        </header>
    )
}

export default Header