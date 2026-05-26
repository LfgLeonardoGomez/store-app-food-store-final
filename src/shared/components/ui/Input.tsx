import type { ReactNode } from "react"
import {useId} from "react"

type InputVariants = 'text' | 'password' | 'email' | 'number' | 'search'

interface InputProps {
    label?: string
    placeholder?: string
    type?: InputVariants
    value?: string
    onChange?:(value: string) => void
    error?: string
    disabled?: boolean
    icon?: ReactNode
    className?: string
}

const wrapperclasses = 'relative flex items-center w-full bg-background border border-border rounded-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-text-muted'
const inputclasses = 'w-full bg-transparent outline-none py-2.5 pr-4 text-text-primary placeholder:text-text-muted disabled:bg-transparent'
const labelclasses = 'block mb-1.5 text-sm font-medium text-text-secondary'
const errorClasses = 'mt-1.5 text-sm text-danger'

export const Input = ({label, placeholder, type = 'text', value,
    onChange, error,disabled = false, icon, className = ''
}: InputProps)=>{
    const inputPadding = icon ? 'pl-10' : 'pl-4'
    const id = useId()
    return(
        <div>
            {label && <label htmlFor= {id} className={labelclasses}>{label}</label>}
            <div className={wrapperclasses}>
                {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">{icon}</span>}
                <input 
                    id={id}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={(e)=>onChange?.(e.target.value)}
                    className={`${inputclasses} ${inputPadding} pr-4 ${className}`} />
            </div>
        
            {error && <span className = {errorClasses}>{error}</span>}
        </div>
    )
}


