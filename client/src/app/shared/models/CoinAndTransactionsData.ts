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
            totalHoldingsValue = totalHoldingsValue + (transaction.quantity*this.currentPriceUsd);
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
            totalHoldingsValue = totalHoldingsValue + (transaction.quantity*this.currentPriceUsd);
            totalHoldingsCost = totalHoldingsCost + transaction.cost;
        });
        return totalHoldingsValue-totalHoldingsCost;
    }

    constructor(id: string, 
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
                transactions: ITransaction[]
                ) {
        this.id = id,
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
        this.transactions = transactions
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






