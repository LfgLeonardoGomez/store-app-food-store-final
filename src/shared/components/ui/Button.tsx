import  type {ReactNode} from 'react'

type ButtonVariants = 'primary'| 'secondary' | 'ghost' | 'outline' | 'danger'

const variants= {
    primary: 'bg-primary text-white hover:bg-primary-hover active:scale-[0.98] shadow-sm hover:shadow-md' ,
    secondary: 'bg-secondary text-white hover:bg-secondary-light active:scale-[0.98]' ,
    ghost: 'text-primary hover:bg-primary-light active:scale-[0.98]',
    outline: 'border-2 border-primary text-primary hover:bg-primary-light active:scale-[0.98]' ,
    danger: 'bg-danger text-white hover:opacity-90 active:scale-[0.98]',
}
const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

interface ButtonProps {
    children: ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    variant?: ButtonVariants
    className?: string
    size?: keyof typeof sizeClasses
}

export const Button = ({children, onClick, type = 'button', 
            disabled = false, variant = 'primary',  size = 'md',className = ''}: ButtonProps) => {
                return(
                    <button
                        type={type}
                        onClick={onClick}
                        disabled={disabled}
                        className={
                                    `
                            inline-flex items-center justify-center gap-2
                            font-medium
                            rounded-pill
                            transition-all duration-200
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${sizeClasses[size]}
                            
                            ${variants[variant]}
                            ${className}
                            
                        `
                        }>
                        {children}
                    </button>
                )
            }