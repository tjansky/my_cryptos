import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateTransactionDto } from 'src/app/shared/dtos/CreateTransactionDto';
import { Coin } from 'src/app/shared/models/Coin';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { AppStateService } from 'src/app/shared/services/app-state.service';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.css']
})
export class SellFormComponent implements OnInit {
  @Input() coin: Coin;
  sellForm: FormGroup;

  constructor(private apiHelperService: ApiHelperService, private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.sellForm = new FormGroup({
      totalReceived: new FormControl(),
      quantity: new FormControl(),
      fee: new FormControl()
    });
  }


  onSubmit(form: FormGroup){
    let newTrans: CreateTransactionDto = {
      type: 2,
      addedCoinId: this.coin.idName,
      price: this.calculateCoinPrice(form.value.quantity, form.value.totalReceived),
      cost: 0,
      quantity: form.value.quantity,
      fee: form.value.fee,
      earned: form.value.totalReceived
    };

    // insert buy transaction to db and send it to other components
    this.apiHelperService.addTransaction(newTrans).subscribe(res => {
      if (res != null) {
        this.appStateService.sendAddedTransaction(res);
        console.log(res);
      } else {
        alert("something went wrong while insert coin transaction");
      }
    });
  }

  private calculateCoinPrice(quantity: number, earned: number){
    return (1/quantity)*earned;
  }

}
