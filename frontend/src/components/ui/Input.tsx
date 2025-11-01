import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base input styling - clean white with border
              'w-full px-4 py-3 rounded-xl text-base',
              'bg-white border-2 border-gray-200',

              // Focus states - colorful ring
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
              'focus:border-primary-500',

              // Disabled state
              'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
              'disabled:border-gray-200',

              // Transitions
              'transition-all duration-200',

              // With icon padding
              icon && 'pl-10',

              // Error state
              error && [
                'border-error-500 bg-error-50',
                'focus:ring-error-500 focus:border-error-500',
              ],

              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-gray-600"
          >
            {helperText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-error-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
