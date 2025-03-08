import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { userFormSchema, UserFormType } from '../schema'
import { APIUser } from '@/hooks/use-orders'
import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/shared/loading-button'
import { PasswordInput } from '@/components/ui/password-input'
import { useAddUser } from '../mutations/use-add-user'
import { toast } from 'sonner'
import { useUpdateUser } from '../mutations/use-update-user'

export default function UserDialog({
  selectedUser,
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedUser: APIUser | null
}) {
  const form = useForm<UserFormType>({
    resolver: yupResolver(userFormSchema),
    values: {
      username: selectedUser ? selectedUser.username : '',
      email: selectedUser ? selectedUser.email : '',
      password: '',
      name: {
        firstname: selectedUser ? selectedUser.name.firstname : '',
        lastname: selectedUser ? selectedUser.name.lastname : ''
      },
      address: {
        city: selectedUser ? selectedUser.address.city : '',
        street: selectedUser ? selectedUser.address.street : '',
        number: selectedUser ? selectedUser.address.number : 0,
        zipcode: selectedUser ? selectedUser.address.zipcode : ''
      },
      phone: selectedUser ? selectedUser.phone : ''
    }
  })

  const { mutate, isPending } = useAddUser({
    onSuccess: data => {
      toast.success(`New User with ID ${data.id} has been added successfully.`)
      form.reset()
      onOpenChange(false)
    }
  })

  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateUser({
    onSuccess: data => {
      toast.success(`User with ID ${data.id} has been updated successfully.`)
      form.reset()
      onOpenChange(false)
    }
  })

  async function onSubmit(values: UserFormType) {
    if (selectedUser)
      updateMutate({
        ...values,
        id: selectedUser.id,
        password: values.password || selectedUser.password
      })
    else mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="Form to add or update users">
        <DialogHeader>
          <DialogTitle>
            {selectedUser ? 'Update User' : 'Add New User'}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {selectedUser
                      ? 'New Password (leave empty to keep current)'
                      : 'Password'}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name.firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name.lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="1-570-236-7033" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="font-medium text-lg pt-2">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input placeholder="7682" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                isLoading={isPending || isUpdatePending}
                type="submit"
              >
                {selectedUser ? 'Update User' : 'Add User'}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
