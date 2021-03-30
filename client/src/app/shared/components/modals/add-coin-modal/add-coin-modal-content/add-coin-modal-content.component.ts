import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CryptoDataService } from 'src/app/portfolio/crypto-data.service';
import { ICoinIdentifier } from 'src/app/shared/models/ICoinIdentifier';

@Component({
  selector: 'app-add-coin-modal-content',
  templateUrl: './add-coin-modal-content.component.html',
  styleUrls: ['./add-coin-modal-content.component.css']
})
export class AddCoinModalContentComponent implements OnInit {

  title: string;
  closeBtnName: string;
  list: any[] = [];

  coinNamesAndIds$: Observable<ICoinIdentifier[]>
 
  constructor(public bsModalRef: BsModalRef, private cryptoDataService: CryptoDataService) {}
 
  ngOnInit() {
    // in future this has to be cashed somehow (maybe via using service)
    this.coinNamesAndIds$ = this.cryptoDataService.getAllCoinNamesAndIds()
  }

  onNewCoinAdd(newCoinId: string) {
    console.log("IM ADDING TO TRACK COIN WITH ID: ", newCoinId);
  }

}
