export enum Role {
  User = 'user',
  Staff = 'staff',
  Admin = 'admin'
}

export type User = {
  id: number
  name: string
  role: Role
}

export enum Category {
  Electronics = 'electronics',
  Jwelery = 'jewelery',
  MenClothing = "men's clothing",
  WomenClothing = "women's clothing"
}

type Rating = { rate: number; count: number }

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
  rating: Rating
}

export type CartItem = {
  product: Product
  quantity: number
}
