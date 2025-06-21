import React, { ChangeEvent } from 'react';

interface InputProps {
    placeholder?: string,
    children?: React.ReactNode,
    className?: string,
    required?: boolean,
    id?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const Input: React.FC<InputProps> = ({ placeholder, children, className, required, id, onChange }) => {
    
    const baseClass = "bg-amber-600 text-white rounded px-4 py-2"
    
    return (
        <input onChange={onChange} required={required} placeholder={placeholder} className={`${baseClass} ${className}`} id={id}>
            {children}
        </input>
    )
}