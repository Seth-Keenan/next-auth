import React from 'react'

interface ChatCardProps {
    onClick?: () => void
    children?: React.ReactNode
    className?: string
}

export const ChatCard: React.FC<ChatCardProps> = ({ onClick, children, className }) => {
    const baseClass = "w-64 h-24 bg-amber-600 hover:bg-amber-700 transition: duration-200"
    
    return (
        <button onClick={onClick} className={`${baseClass} ${className}`}>
            {children}
        </button>
    )
}