import { ReactNode } from "react"

interface CardProps {
    title?: string | null
    children: ReactNode
    styles?: string
}

const Card: React.FC<CardProps> = ({title, children, styles}) => {
    if (title) {
        return (
            <div className={`bg-white m-5 rounded-lg shadow-md ${styles} p-4`}>
                <h4 className="text-xl mb-2">{title}</h4>
                {children}
            </div>
        )
    } else {
        return (
            <div className={`bg-white m-5 rounded-lg shadow-md ${styles} p-4`}>
                {children}
            </div>
        )
    }
}

export default Card