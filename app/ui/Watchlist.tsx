'use client'
import { useState } from "react"
import ListItem from "../components/ListItem/ListItem"

type WatchlistProps = {
    className?: string
}

const Watchlist: React.FC<WatchlistProps> = ({className}) => {
const [watchList, setWatchList] = useState([
    {
        leftHeader: 'AMZN',
        rightHeader: 809.16,
        subRight: 19.89,
        subLeft: 10
    },
    {
        leftHeader: 'MSFT',
        rightHeader: 809.16,
        subRight: 19.89
    },
    {
        leftHeader: 'TSLA',
        rightHeader: 809.16,
        subRight: 19.89
    },
    {
        leftHeader: 'AAPL',
        rightHeader: 809.16,
        subRight: 19.89
    },
])

    return (
        <aside className={`relative ${className}`}>
            <input 
                type="text" 
                className="w-full bg-gray-300 border-2 border-gray-300 py-3 pl-5"
                placeholder="Search for stock..."
            />
            <ul className="bg-white">
                { watchList.map(stock => (
                    <ListItem className="p-1" props={{...stock}}/>
                ))}
            </ul>
        </aside>
            
    )
}

export default Watchlist