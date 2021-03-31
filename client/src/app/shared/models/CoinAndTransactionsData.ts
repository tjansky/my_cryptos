export class CoinAndTransactionsData {
    id: string;
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

    transactions: ITransaction[];

    private _holdings: number;
    private _holdingsValueUsd: number;
    private _averagePurchasePrice: number;
    private _profitLoss: number;

    //quantity of token holding
    public get holdings() {
        let totalHoldings = 0;
        this.transactions.forEach(transaction => {
            totalHoldings = totalHoldings + transaction.quantity;
        });
        return totalHoldings;
    }

    //usd vale od token holding
    public get holdingsValueUsd() {
        let totalHoldingsValue = 0;
        this.transactions.forEach(transaction => {
            totalHoldingsValue = totalHoldingsValue + transaction.price;
        });
        return totalHoldingsValue;
    }

    //average token purchase price
    public get averagePurchasePrice() {
        let totalHoldingsCost = 0;
        this.transactions.forEach(transaction => {
            totalHoldingsCost = totalHoldingsCost + transaction.cost;
        });
        return totalHoldingsCost/this.transactions.filter(t=> t.cost>0).length;
    }

    // how much profit or loss there is
    public get profitLoss() {
        let totalHoldingsValue = 0;
        let totalHoldingsCost = 0;
        
        this.transactions.forEach(transaction => {
            totalHoldingsValue = totalHoldingsValue + transaction.price;
            totalHoldingsCost = totalHoldingsCost + transaction.cost;
        });
        return totalHoldingsValue-totalHoldingsCost;
    }
    
}



export interface ITransaction {
    id: string;
    //date: Date;
    price: number;
    quantity: number;
    fees: number;
    cost: number;
    earned: number;
}






