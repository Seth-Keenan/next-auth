import React from 'react';

interface InputProps {
    placeholder?: string,
    children?: React.ReactNode,
    className?: string,
    required?: boolean,
}

export const Input: React.FC<InputProps> = ({ placeholder, children, className, required }) => {
    
    const baseClass = "bg-amber-600 text-white rounded px-4 py-2"
    
    return (
        <input required={required} placeholder={placeholder} className={`${baseClass} ${className}`}>
            {children}
        </input>
    )
}