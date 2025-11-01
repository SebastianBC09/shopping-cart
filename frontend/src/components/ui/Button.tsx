import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, fullWidth, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles - Modern desktop
          'inline-flex items-center justify-center font-semibold',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'active:scale-[0.98]',

          // Variants - Colorful but professional
          {
            // Primary - Vibrant blue
            'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800':
              variant === 'primary' && !disabled,
            'shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40':
              variant === 'primary',
            'focus-visible:ring-primary-500':
              variant === 'primary',

            // Secondary - Light gray with color on hover
            'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300':
              variant === 'secondary' && !disabled,
            'focus-visible:ring-gray-400':
              variant === 'secondary',

            // Accent - Teal/cyan for secondary CTAs
            'bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800':
              variant === 'accent' && !disabled,
            'shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40':
              variant === 'accent',
            'focus-visible:ring-accent-500':
              variant === 'accent',

            // Outline - White with colored border
            'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50':
              variant === 'outline' && !disabled,
            // Danger - Red for destructive actions
            'bg-error-600 text-white hover:bg-error-700 active:bg-error-800':
              variant === 'danger' && !disabled,
            'shadow-lg shadow-error-500/30 hover:shadow-xl hover:shadow-error-500/40':
              variant === 'danger',
            'focus-visible:ring-error-500':
              variant === 'danger',

            // Success - Green for positive actions
            'bg-success-600 text-white hover:bg-success-700 active:bg-success-800':
              variant === 'success' && !disabled,
            'shadow-lg shadow-success-500/30 hover:shadow-xl hover:shadow-success-500/40':
              variant === 'success',
            'focus-visible:ring-success-500':
              variant === 'success',
          },

          // Sizes - Desktop optimized
          {
            'px-3 py-1.5 text-sm rounded-lg': size === 'sm',
            'px-5 py-2.5 text-base rounded-xl': size === 'md',
            'px-7 py-3 text-lg rounded-xl': size === 'lg',
            'px-8 py-4 text-xl rounded-2xl': size === 'xl',
          },

          // Full width
          fullWidth && 'w-full',

          className
        )}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
