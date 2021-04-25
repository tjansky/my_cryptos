import { TransactionDto } from "./TransactionDto";

export interface AddedCoinIdDto{
    appUserId: number,
    coinNameId: string,
    transactions: TransactionDto[]
}