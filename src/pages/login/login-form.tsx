import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, LoginFormValues } from './schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Link } from 'react-router'
import { LoadingButton } from '@/components/shared/loading-button'
import { toast } from 'sonner'
import { login } from './actions'
import { useMutation } from '@tanstack/react-query'
import useAuth from '@/store/useAuth'

export function LoginForm() {
  const setAuth = useAuth(state => state.setAuth)
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      setAuth(data.token)
    },
    onError: error => {
      toast.error(error.message)
    }
  })
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  function onSubmit(values: LoginFormValues) {
    mutate(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Use one of the username and password from this{' '}
          <Link
            target="_blank"
            to="https://fakestoreapi.com/users"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            users
          </Link>{' '}
          list. Admin user: username - donero, password - ewedon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="donero" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="ewedon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <LoadingButton isLoading={isPending}>Login</LoadingButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
