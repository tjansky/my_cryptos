import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddedCoinIdDto } from '../dtos/AddedCoinIdDto';
import { CreateTransactionDto } from '../dtos/CreateTransactionDto';
import { TransactionDto } from '../dtos/TransactionDto';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  constructor(private http: HttpClient) { }
  // token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJMb3JlbmEiLCJuYmYiOjE2MjAzMjkyNTgsImV4cCI6MTYyMDkzNDA1OCwiaWF0IjoxNjIwMzI5MjU4fQ.Bp6YwRR3glBwIaQRmiFe08vAwOa1FPFGZkTbY5zpPWVwMxIQcdYVI1VZGvaiCAVG6F-2fwSGz96_eqJbSLKE0g'

  getAddedCoinsIds(){
    return this.http.get<AddedCoinIdDto[]>('https://localhost:5001/AddedCoin')
  }

  addAddedCoin(coinNameId: string){
    return this.http.post('https://localhost:5001/AddedCoin?addedCoinId='+coinNameId, {})
  }

  addTransaction(trans: CreateTransactionDto){
    return this.http.post<TransactionDto>('https://localhost:5001/Transactions', trans)
  }

  deleteAddedCoin(coinNameId: string){
    return this.http.delete<AddedCoinIdDto>('https://localhost:5001/AddedCoin/'+coinNameId)
  }

  deleteTransaction(transId: number){
    return this.http.delete<number>('https://localhost:5001/Transactions/'+transId.toString())
  }
  
}
