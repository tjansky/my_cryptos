import { TransactionDto } from "../dtos/TransactionDto";

export class Coin {
    idName: string;
    symbol: string;
    name: string;

    thumbImage: string;
    smallImage: string;
    largeImage: string;

    currentPriceUsd: number;
    marketCapUsd: number;
    priceChange24hPercentage: number;
    priceChange7dPercentage: number;
    priceChange14dPercentage: number;
    priceChange30dPercentage: number;

    priceChange24hUsd: number;
    priceChange7dUsd: number;
    priceChange14dUsd: number;
    priceChange30dUsd: number;

    transactions: TransactionDto[];

    private _holdings: number;
    private _holdingsValueUsd: number;
    private _averagePurchasePrice: number;
    private _profitLoss: number;

    //quantity of token holding
    public get holdings() {
        return this.calculateHoldings(this.transactions)
    }

    //usd vale od token holding
    public get holdingsValueUsd() {
        let quantity = this.calculateHoldings(this.transactions);
        return quantity*this.currentPriceUsd;
    }

    //average token purchase price - DONT THINK WORKS FOR NOW
    // public get averagePurchasePrice() {
    //     let totalHoldingsCost = 0;
    //     this.transactions.forEach(transaction => {
    //         totalHoldingsCost = totalHoldingsCost + transaction.cost;
    //     });
    //     return totalHoldingsCost/this.transactions.filter(t=> t.cost>0).length;
    // }

    // how much profit or loss there is
    public get profitLoss() {
        let quantity = this.calculateHoldings(this.transactions);

        let totalHoldingsValue = quantity*this.currentPriceUsd;
        let totalCost = this.calculateAllCost(this.transactions);
        let totalEarned = this.calculateAllEarned(this.transactions);

        return (totalHoldingsValue-totalCost)+totalEarned;
    }

    

    constructor(idName: string, 
                symbol: string, 
                name: string, 
                thumbImage: string, 
                smallImage: string,
                largeImage: string, 
                currentPriceUsd: number, 
                marketCapUsd: number,
                priceChange24hPer: number, 
                priceChange7dPer: number, 
                priceChange14dPer: number,
                priceChange30dPer: number,
                priceChange24hUsd: number,
                priceChange7dUsd: number,
                priceChange14dUsd: number,
                priceChange30dUsd: number,
                transactions: TransactionDto[]
                ) {
        this.idName = idName,
        this.symbol = symbol,
        this.name = name,
        this.thumbImage = thumbImage,
        this.smallImage = smallImage,
        this.largeImage = largeImage,
        this.currentPriceUsd = currentPriceUsd,
        this.marketCapUsd = marketCapUsd,
        this.priceChange24hPercentage = priceChange24hPer,
        this.priceChange7dPercentage = priceChange7dPer,
        this.priceChange14dPercentage = priceChange14dPer,
        this.priceChange30dPercentage = priceChange30dPer,
        
        this.priceChange24hUsd = priceChange24hUsd,
        this.priceChange7dUsd = priceChange7dUsd,
        this.priceChange14dUsd = priceChange14dUsd,
        this.priceChange30dUsd = priceChange30dUsd

        this.transactions = transactions
    }
    


    //helper methods
    private calculateHoldings(transactions: TransactionDto[]): number{
        let quantity = 0;
        transactions.forEach(t => {
            if(t.type == 1 || t.type == 3){
                quantity += t.quantity;
            } else if(t.type == 2 || t.type == 4){
                quantity -= t.quantity;
            }
        });
        return quantity;
    }

    private calculateAllCost(transactions: TransactionDto[]): number{
        let totalCost = 0;
        transactions.forEach(t => {
            totalCost += t.cost;
        });
        return totalCost;
    }

    private calculateAllEarned(transactions: TransactionDto[]): number{
        let totalEarned = 0;
        transactions.forEach(t => {
            totalEarned += t.earned;
        });
        return totalEarned;
    }

}



// export interface ITransaction {
//     id: string;
//     //date: Date;
//     price: number;
//     quantity: number;
//     fees: number;
//     cost: number;
//     earned: number;
// }






