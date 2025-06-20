import React from 'react'

interface ButtonProps {
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  
    const baseClass = "px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-800 transition: duration-200"
  
    return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  )
}