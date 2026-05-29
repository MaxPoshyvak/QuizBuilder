import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}

export const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
    const baseStyles =
        'px-4 py-2 rounded-xl font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]',
        secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm',
        danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
        ghost: 'hover:bg-white/5 text-zinc-400 hover:text-white',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};
