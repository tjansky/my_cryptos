import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateTransactionDto } from 'src/app/shared/dtos/CreateTransactionDto';
import { Coin } from 'src/app/shared/models/Coin';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { AppStateService } from 'src/app/shared/services/app-state.service';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.css']
})
export class BuyFormComponent implements OnInit {
  @Input() coin: Coin;
  buyForm: FormGroup;
  
  constructor(private apiHelperService: ApiHelperService, 
              private appStateService: AppStateService, 
              private toastr: ToastrService) { }

  ngOnInit() {
    this.buyForm = new FormGroup({
      totalSpent: new FormControl(),
      quantity: new FormControl(),
      fee: new FormControl()
    });
  }

  onSubmit(form: FormGroup){
    console.log(form.value);


    let newTrans: CreateTransactionDto = {
      type: 1,
      addedCoinId: this.coin.idName,
      price: this.calculateCoinPrice(form.value.quantity, form.value.totalSpent),
      cost: form.value.totalSpent,
      quantity: form.value.quantity,
      fee: form.value.fee,
      earned: 0
    };

    console.log(newTrans);

    // insert buy transaction to db and send it to other components
    this.apiHelperService.addTransaction(newTrans).subscribe(res => {
      this.appStateService.sendAddedTransaction(res);
      this.toastr.success("Successfuly added new transaction.");
    }, err => {
      // show toastr
      this.toastr.error("Something went wrong while trying to add transaction");
    });
  }

  private calculateCoinPrice(quantity: number, cost: number){
    return (1/quantity)*cost;
  }

}
