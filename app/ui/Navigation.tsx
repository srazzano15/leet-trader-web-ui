import Link from "next/link"

interface NavigationProps {
    isOpen: boolean
}

const Navigation: React.FC<NavigationProps> = ({ isOpen }) => {

    let links = [
        {
            text: 'Home',
            route: '/'
        },
        {
            text: 'Portfolio',
            route: '/portfolio'
        },
        {
            text: 'Trade',
            route: '/trade'
        },
        {
            text: 'Research',
            route: '/research'
        },
        {
            text: 'Account',
            route: '/account'
        },
    ]
    if (isOpen) {
        return (
            <nav className="rounded-bl-lg absolute top-[4em] end-0 grid grid-flow-row bg-white shadow-lg z-0">
                {links.map(link => <Link className="px-5 py-3 border border-b-gray-200" href={link.route}>{link.text}</Link>)}
            </nav>
        )
    }
}

export default Navigation