import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  colorAccent?: 'primary' | 'accent' | 'success' | 'warning' | 'none';
}

export function Card({ children, className, hover = false, onClick, colorAccent = 'none' }: CardProps) {
  const isInteractive = hover || onClick;

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        // Base card styling - white with subtle border
        'bg-white rounded-2xl border border-gray-200 overflow-hidden',
        'shadow-md',

        // Color accent top border
        {
          'border-t-4 border-t-primary-500': colorAccent === 'primary',
          'border-t-4 border-t-accent-500': colorAccent === 'accent',
          'border-t-4 border-t-success-500': colorAccent === 'success',
          'border-t-4 border-t-warning-500': colorAccent === 'warning',
        },

        // Interactive states
        isInteractive && [
          'transition-all duration-200',
          'hover:shadow-xl hover:border-gray-300',
          'hover:-translate-y-1',
        ],

        onClick && [
          'cursor-pointer',
          'active:scale-[0.99]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        ],

        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6 pb-4', className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-6 pt-4 border-t border-gray-100', className)}>
      {children}
    </div>
  );
}
