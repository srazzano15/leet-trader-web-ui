import { ReactNode } from "react"

interface CardProps {
    title?: string | null
    children: ReactNode
}

const Card: React.FC<CardProps> = ({title, children}) => {
    const styles = `bg-white m-5 rounded-sm shadow-md`
    if (title) {
        return (
            <div className={styles}>
                <h4 className="text-lg mb-2 px-2 pt-2">{title}</h4>
                {children}
            </div>
        )
    } else {
        return (
            <div className={styles}>
                {children}
            </div>
        )
    }
}

export default Card