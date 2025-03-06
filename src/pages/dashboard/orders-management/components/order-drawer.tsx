import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { formatCurrency } from '@/lib/utils'
import OrderItem from './order-item'
import OrderSummary from './order-summary'
import { Order } from '@/hooks/use-orders'

export default function OrderDrawer({
  selectedOrder
}: {
  selectedOrder: Order | null
}) {
  return (
    <DrawerContent>
      {selectedOrder && (
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <DrawerHeader>
              <DrawerTitle className="text-2xl font-semibold mb-8">
                Order Details
              </DrawerTitle>
            </DrawerHeader>

            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Customer Information</h3>
                <div className="rounded-md border p-4">
                  <p>
                    <strong>Name:</strong> {selectedOrder.user.name.firstname}{' '}
                    {selectedOrder.user.name.lastname}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedOrder.user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedOrder.user.phone || 'N/A'}
                  </p>

                  <div className="mb-8">
                    <strong>Shipping Address:</strong>
                    <div className="">
                      {selectedOrder.user.address ? (
                        <>
                          <p>
                            {selectedOrder.user.address.number}{' '}
                            {selectedOrder.user.address.street}
                          </p>
                          <p>
                            {selectedOrder.user.address.city},{' '}
                            {selectedOrder.user.address.zipcode}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-500 italic">
                          No address information available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Order Information</h3>
                <div className="rounded-md border p-4">
                  <p>
                    <strong>Order ID:</strong> #{selectedOrder.id}
                  </p>
                  <p>
                    <strong>Date:</strong>{' '}
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'full',
                      timeStyle: 'short'
                    }).format(new Date(selectedOrder.date))}
                  </p>
                  <p>
                    <strong>Total:</strong>{' '}
                    <span>
                      {formatCurrency(
                        selectedOrder.products.reduce(
                          (total, item) =>
                            total + item.product.price * item.quantity,
                          0
                        )
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-4">Order Items</h3>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {selectedOrder.products.map(item => (
                  <OrderItem key={item.product.id} item={item} />
                ))}
              </div>

              <OrderSummary order={selectedOrder} />
            </div>
          </div>
        </div>
      )}
    </DrawerContent>
  )
}
