import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        // Base badge styling
        'inline-flex items-center justify-center font-semibold rounded-full',
        'whitespace-nowrap',

        // Sizes
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
          'px-4 py-1.5 text-base': size === 'lg',
        },

        // Variants - Colorful with good contrast
        {
          'bg-gray-100 text-gray-700 border border-gray-200': variant === 'default',
          'bg-primary-100 text-primary-700 border border-primary-200': variant === 'primary',
          'bg-accent-100 text-accent-700 border border-accent-200': variant === 'accent',
          'bg-success-100 text-success-700 border border-success-200': variant === 'success',
          'bg-error-100 text-error-700 border border-error-200': variant === 'error',
          'bg-warning-100 text-warning-700 border border-warning-200': variant === 'warning',
          'bg-info-100 text-info-700 border border-info-200': variant === 'info',
        },

        className
      )}
    >
      {children}
    </span>
  );
}
