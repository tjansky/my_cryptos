export interface CreateTransactionDto{
    addedCoinId: string,
    type: number,
    price: number,
    quantity: number,
    fee: number,
    cost: number,
    earned: number
}