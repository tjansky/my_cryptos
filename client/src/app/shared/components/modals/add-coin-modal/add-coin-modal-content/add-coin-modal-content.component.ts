import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CryptoDataService } from 'src/app/portfolio/crypto-data.service';
import { PortfolioService } from 'src/app/portfolio/portfolio.service';
import { ICoinIdentifier } from 'src/app/shared/models/ICoinIdentifier';

@Component({
  selector: 'app-add-coin-modal-content',
  templateUrl: './add-coin-modal-content.component.html',
  styleUrls: ['./add-coin-modal-content.component.css']
})
export class AddCoinModalContentComponent implements OnInit {

  closeBtnName: string;

  // this prop is needed so (ngModelChange) works and we can pass event prop
  coinSearch: string;

  //coinNamesAndIds$: Observable<ICoinIdentifier[]>
  coinNamesAndIds: ICoinIdentifier[] = [];
  searchedCoinNamesAndIds: ICoinIdentifier[] = [];
 
  constructor(public bsModalRef: BsModalRef, 
              private cryptoDataService: CryptoDataService,
              private portfolioService: PortfolioService) {}
 
  ngOnInit() {
    // in future this has to be cashed somehow (maybe via using service)
    this.cryptoDataService.getAllCoinNamesAndIds().subscribe(coins => {
      this.coinNamesAndIds = coins;
    });
  }

  // TODO - dont call this search logic until user stop typing for 1.5 seconds
  // TODO - somehow make best options to come first
  onSearchChange(event: string) {
    console.log(this.coinSearch);
    this.searchedCoinNamesAndIds = this.coinNamesAndIds.filter(function(el){
      return el.name.toLowerCase().includes(event.toLowerCase());
    })
  }


  onNewCoinAdd(newCoinId: string) {
    this.portfolioService.addCoinIdToDb(newCoinId).subscribe(coinIsAdded => {
      if (coinIsAdded == 1) {
        // if it was added in db send it to portfolio component
        this.portfolioService.sendNewCoinIdSubject(newCoinId);
      } else {
        alert("Coin wasnt added");
      }
      
    });
  }

}
