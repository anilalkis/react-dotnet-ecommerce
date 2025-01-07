export interface IProduct
{
    id: number,
    productName: string,
    description?: string,
    price: number,
    isActive: boolean,
    imageUrl?: string,
    stock: number
}
