import api from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const deleteOrder = async (orderId: number) => {
  const { data } = await api.delete(`/carts/${orderId}`)
  return data
}

export const useDeleteOrder = ({
  setDeletingOrderId
}: {
  setDeletingOrderId: React.Dispatch<React.SetStateAction<number | null>>
}) =>
  useMutation({
    mutationFn: deleteOrder,
    onSuccess: data => {
      toast.success('Order deleted successfully! ' + JSON.stringify(data))
      setDeletingOrderId(null)
    },
    onError: error => {
      toast.error('Error deleting order: ' + error.message)
      setDeletingOrderId(null)
    }
  })
