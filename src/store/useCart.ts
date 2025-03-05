import config from '@/lib/config'
import { CartItem } from '@/lib/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const persistKey = `${config.appName}-cart`

type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, updatedQuantity: number) => void
  emptyCart: () => void
}

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: item => set({ items: [...get().items, item] }),
      removeItem: productId =>
        set({
          items: get().items.filter(item => item.product.id !== productId)
        }),
      updateQuantity: (productId, updatedQuantity) =>
        set({
          items: get().items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        }),
      emptyCart: () => set({ items: [] })
    }),
    { name: persistKey }
  )
)

export default useCart
