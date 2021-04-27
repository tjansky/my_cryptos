import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddedCoinIdDto } from '../dtos/AddedCoinIdDto';
import { CreateTransactionDto } from '../dtos/CreateTransactionDto';
import { TransactionDto } from '../dtos/TransactionDto';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

   headers_object1 = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJMb3JlbmEiLCJuYmYiOjE2MTg4NTcxMTksImV4cCI6MTYxOTQ2MTkxOSwiaWF0IjoxNjE4ODU3MTE5fQ.nnvvQFgl7_g4uoGQT2kF4XJ1bs2fXHJS4iqqoVI-V-xgPug4deOO6YMG2mriVrahc_nOQy7GWosi43dC1Th3Bw"
  });

      httpOptions = {
        headers: this.headers_object1
      };



  constructor(private http: HttpClient) { }
  token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJMb3JlbmEiLCJuYmYiOjE2MTk0NjI3MTEsImV4cCI6MTYyMDA2NzUxMSwiaWF0IjoxNjE5NDYyNzExfQ.S46Iixf_xETAe3gMX8SVltScu1GMq4S4VZjB05r3vYj76qHRGMOXoGvR-gTHIO1cWWcUtVH_qfRrxo8kp7KpIg'

  getAddedCoinsIds(){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    return this.http.get<AddedCoinIdDto[]>('https://localhost:5001/AddedCoin',{headers: headers_object})
  }

  addAddedCoin(coinNameId: string){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    return this.http.post('https://localhost:5001/AddedCoin?addedCoinId='+coinNameId, {}, {headers: headers_object})
  }

  addTransaction(trans: CreateTransactionDto){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    return this.http.post<TransactionDto>('https://localhost:5001/Transactions', trans, {headers: headers_object})
  }

  deleteAddedCoin(coinNameId: string){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    return this.http.delete<AddedCoinIdDto>('https://localhost:5001/AddedCoin/'+coinNameId,{headers: headers_object})
  }

  deleteTransaction(transId: number){
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    return this.http.delete<number>('https://localhost:5001/Transactions/'+transId.toString(),{headers: headers_object})
  }
  
}
