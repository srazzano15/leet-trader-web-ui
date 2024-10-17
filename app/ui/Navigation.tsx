import Link from "next/link"

interface NavigationProps {
    isOpen: boolean
}

const Navigation: React.FC<NavigationProps> = ({ isOpen }) => {

    let links = [
        {
            text: 'Dashboard',
            route: '/dashboard'
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
        {
            text: 'Logout',
            route: '/logout'
        },
    ]
    if (isOpen) {
        return (
            <nav className="absolute top-[4.25em] end-0 grid grid-flow-row bg-white shadow-lg z-0">
                {links.map(link => <Link className="px-8 py-3 border-y border-b-gray-200 hover:bg-gradient-to-r from-white to-emerald-300" href={link.route}>{link.text}</Link>)}
            </nav>
        )
    }
}

export default Navigation