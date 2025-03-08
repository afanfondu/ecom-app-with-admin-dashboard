import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { APIUser } from '@/hooks/use-orders'
import { useUserDetails } from '../queries/use-user-details'
import AlertError from '@/components/shared/alert-error'
import { Skeleton } from '@/components/ui/skeleton'

export default function UserDrawer({
  selectedUser
}: {
  selectedUser: APIUser
}) {
  const { data: user, isLoading, error } = useUserDetails(selectedUser.id)

  return (
    <DrawerContent>
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-8">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-semibold mb-8">
              User Details
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>

          {isLoading ? (
            <div className="mb-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="rounded-md border p-4 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array(4)
                      .fill(0)
                      .map((_, idx) => (
                        <div key={idx}>
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-6 w-32" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Address</h3>
                <div className="rounded-md border p-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array(4)
                        .fill(0)
                        .map((_, idx) => (
                          <div key={idx}>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-6 w-32" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <AlertError description={error.message} />
          ) : (
            user && (
              <div className="mb-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="rounded-md border p-4 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Full Name
                        </p>
                        <p className="font-medium">
                          {user.name.firstname} {user.name.lastname}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Username
                        </p>
                        <p className="font-medium">{user.username}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{user.phone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Address</h3>
                  <div className="rounded-md border p-4">
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Street Address
                          </p>
                          <p className="font-medium">
                            {user.address.number} {user.address.street}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">City</p>
                          <p className="font-medium">{user.address.city}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            ZIP Code
                          </p>
                          <p className="font-medium">{user.address.zipcode}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Geolocation
                          </p>
                          <p className="font-medium">
                            {user.address.geolocation
                              ? `${user.address.geolocation.lat}, ${user.address.geolocation.long}`
                              : 'Not available'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </DrawerContent>
  )
}
