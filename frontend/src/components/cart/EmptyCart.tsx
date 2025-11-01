import Link from 'next/link';
import { ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function EmptyCart() {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 mb-8">
        <ShoppingCart className="h-16 w-16 text-primary-600" strokeWidth={1.5} />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Your cart is empty
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
      </p>
      <Link href="/">
        <Button size="lg" variant="primary">
          <Package className="h-5 w-5 mr-2" strokeWidth={2.5} />
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}
