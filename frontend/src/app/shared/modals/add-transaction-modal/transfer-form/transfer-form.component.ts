import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateTransactionDto } from 'src/app/shared/dtos/CreateTransactionDto';
import { Coin } from 'src/app/shared/models/Coin';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { AppStateService } from 'src/app/shared/services/app-state.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {
  @Input() coin: Coin;
  transferForm: FormGroup;

  constructor(private apiHelperService: ApiHelperService, 
              private appStateService: AppStateService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.transferForm = new FormGroup({
      transferType: new FormControl(),
      quantity: new FormControl(),
      fee: new FormControl()
    });
  }

  onSubmit(form: FormGroup){
    console.log(form.value);
    let newTrans: CreateTransactionDto = {
      type: form.value.transferType,
      addedCoinId: this.coin.idName,
      price: this.coin.currentPriceUsd,
      cost: 0,
      quantity: form.value.quantity,
      fee: form.value.fee,
      earned: 0
    };

    // insert buy transaction to db and send it to other components
    this.apiHelperService.addTransaction(newTrans).subscribe(
      res => {
        this.appStateService.sendAddedTransaction(res);
        this.toastr.success("Successfuly added new transaction.");
    }, error => {
        // show toastr
        this.toastr.error("Something went wrong while trying to add transaction");
    });
  }

}
