'use client';

import { Cart } from '@/lib/types/cart';
import { formatPrice } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, Truck, Shield, CreditCard } from 'lucide-react';

interface CartSummaryProps {
    cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
  return (
    <Card className="overflow-hidden border-2" colorAccent="success">
      <CardHeader className="bg-gradient-to-br from-primary-50 to-accent-50 border-b-2 border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <ShoppingBag className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Items breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-base text-gray-600 font-medium">
              Items ({cart.totalQuantity})
            </span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(cart.totalPrice)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-success-600" strokeWidth={2.5} />
              <span className="text-base text-gray-600 font-medium">Shipping</span>
            </div>
            <Badge variant="success" size="sm">
              Free
            </Badge>
          </div>
        </div>

        {/* Total */}
        <div className="pt-6 border-t-2 border-gray-200">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {formatPrice(cart.totalPrice)}
            </span>
          </div>
          <p className="text-xs text-gray-500 text-right">Tax included</p>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <div className="flex items-center gap-2 p-3 bg-success-50 rounded-xl">
            <Shield className="h-5 w-5 text-success-600" strokeWidth={2.5} />
            <span className="text-xs font-semibold text-success-700">Secure</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-xl">
            <CreditCard className="h-5 w-5 text-primary-600" strokeWidth={2.5} />
            <span className="text-xs font-semibold text-primary-700">Safe Pay</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 border-t-2 border-gray-100">
        <Button
          fullWidth
          size="xl"
          variant="primary"
          className="shadow-xl shadow-primary-500/30"
        >
          <CreditCard className="h-6 w-6 mr-2" strokeWidth={2.5} />
          <span>Proceed to Checkout</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
