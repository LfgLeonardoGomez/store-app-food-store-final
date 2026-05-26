import type { ReactNode } from "react"


type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning'

const variants= {
        default :'bg-surface text-text-secondary border border-border',
        primary:'bg-primary-light text-primary border border-primary/20',
        success:'bg-success-light text-success border border-success/20',
        danger:'bg-danger-light text-danger border border-danger/20',
        warning:'bg-warning-light text-warning border border-warning/20'
}

interface BadgeProps {

    children: ReactNode
    variant?: BadgeVariant
    className?: string
}

export const Badge = ({children, variant = 'default', className = ''}: BadgeProps)=> {

    return (
        <span
            className={
                `
                inline-flex items-center justify-center
                px-2.5 py-0.5               
                text-xs font-medium        
                rounded-pill               
                transition-colors duration-200
                ${variants[variant]}
                ${className}
                `
                }>
            {children}
            </span>
    )
}



