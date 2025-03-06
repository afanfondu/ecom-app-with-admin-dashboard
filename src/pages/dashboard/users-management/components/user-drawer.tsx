import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { APIUser } from '@/hooks/use-orders'

export default function UserDrawer({
  selectedUser
}: {
  selectedUser: APIUser | null
}) {
  if (!selectedUser) return

  return (
    <DrawerContent>
      <div className="max-h-[80vh] overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-8">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-semibold mb-8">
              User Details
            </DrawerTitle>
          </DrawerHeader>

          <div className="mb-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="rounded-md border p-4 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">
                      {selectedUser.name.firstname} {selectedUser.name.lastname}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium">{selectedUser.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedUser.phone || 'N/A'}</p>
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
                        {selectedUser.address.number}{' '}
                        {selectedUser.address.street}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="font-medium">{selectedUser.address.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ZIP Code</p>
                      <p className="font-medium">
                        {selectedUser.address.zipcode}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Geolocation
                      </p>
                      <p className="font-medium">
                        {selectedUser.address.geolocation
                          ? `${selectedUser.address.geolocation.lat}, ${selectedUser.address.geolocation.long}`
                          : 'Not available'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DrawerContent>
  )
}
