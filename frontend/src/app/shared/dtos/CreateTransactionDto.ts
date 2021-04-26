export interface CreateTransactionDto{
    addedCoinId: number,
    type: number,
    price: number,
    quantity: number,
    fee: number,
    cost: number,
    earned: number
}