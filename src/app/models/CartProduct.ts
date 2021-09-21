export type CartProduct = {
  id: number,
  user_id?: number,
  product_id: number,
  name: string,
  price: number,
  image_url: string,
  order_status: string,
  quantity: number,
  order_id: number,
  message?: string
}