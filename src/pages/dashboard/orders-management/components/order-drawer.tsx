import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { formatCurrency } from '@/lib/utils'
import OrderItem from './order-item'
import OrderSummary from './order-summary'
import { Order } from '@/hooks/use-orders'
import AlertError from '@/components/shared/alert-error'
import { useOrderDetails } from '../queries/use-order-details'
import { Skeleton } from '@/components/ui/skeleton'

export default function OrderDrawer({
  selectedOrder
}: {
  selectedOrder: Order
}) {
  const { data: order, isLoading, error } = useOrderDetails(selectedOrder.id)

  return (
    <DrawerContent>
      <div className="container mx-auto p-8 overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-semibold mb-8">
            Order Details
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>

        {isLoading ? (
          <div className="animate-in fade-in duration-300">
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information Skeleton */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Customer Information</h3>
                <div className="rounded-md border p-4 space-y-3">
                  {/* Customer details skeletons */}
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`customer-skeleton-${i}`}
                        className="flex items-center gap-2"
                      >
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}

                  {/* Shipping address skeleton */}
                  <div className="pt-3 mt-3 border-t">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <div className="space-y-2 pl-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information Skeleton */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Order Information</h3>
                <div className="rounded-md border p-4 space-y-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={`order-info-skeleton-${i}`}
                        className="flex items-center gap-2"
                      >
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Order Items Skeleton */}
            <h3 className="text-lg font-medium mb-4">Order Items</h3>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={`order-item-skeleton-${i}`}
                      className="flex border rounded-md p-4 gap-4"
                    >
                      <Skeleton className="h-20 w-20 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-2/3" />
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Order Summary Skeleton */}
              <div className="border rounded-md p-4 h-fit">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-32 mb-4" />
                  <div className="space-y-2">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={`summary-item-${i}`}
                          className="flex justify-between"
                        >
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <AlertError description={error.message} />
        ) : (
          order && (
            <>
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Customer Information</h3>
                  <div className="rounded-md border p-4">
                    <p>
                      <strong>Name:</strong> {order.user.name.firstname}{' '}
                      {order.user.name.lastname}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.user.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.user.phone || 'N/A'}
                    </p>

                    <div className="mb-8">
                      <strong>Shipping Address:</strong>
                      <div className="">
                        {order.user.address ? (
                          <>
                            <p>
                              {order.user.address.number}{' '}
                              {order.user.address.street}
                            </p>
                            <p>
                              {order.user.address.city},{' '}
                              {order.user.address.zipcode}
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
                      <strong>Order ID:</strong> #{order.id}
                    </p>
                    <p>
                      <strong>Date:</strong>{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'full',
                        timeStyle: 'short'
                      }).format(new Date(order.date))}
                    </p>
                    <p>
                      <strong>Total:</strong>{' '}
                      <span>
                        {formatCurrency(
                          order.products.reduce(
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
                  {order.products.map(item => (
                    <OrderItem key={item.product.id} item={item} />
                  ))}
                </div>

                <OrderSummary order={order} />
              </div>
            </>
          )
        )}
      </div>
    </DrawerContent>
  )
}
