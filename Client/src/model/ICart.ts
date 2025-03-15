export interface Cart
{
    cartId: number;
    customerId: number;
    cartItems: CartItem[];
}

export interface CartItem
{
    productId: number,
    name: string,
    imageUrl?: string,
    price: number,
    quantity: number
}
