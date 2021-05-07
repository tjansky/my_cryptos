import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CoinNameSymbolDto } from '../../dtos/CoinNameSymbolDto';
import { ApiHelperService } from '../../services/api-helper.service';
import { AppStateService } from '../../services/app-state.service';
import { CoinGeckoService } from '../../services/coin-gecko.service';

@Component({
  selector: 'app-add-coin-modal',
  templateUrl: './add-coin-modal.component.html',
  styleUrls: ['./add-coin-modal.component.css']
})
export class AddCoinModalComponent implements OnInit {
  allCoinNameIdsList: CoinNameSymbolDto[] = [];
  filteredCoinNameIdsList: CoinNameSymbolDto[] = [];

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, 
              private apiHelperService: ApiHelperService, 
              private appStateService: AppStateService,
              private coinGeckoService: CoinGeckoService) {}

  coinNameSearch: string;
 
  openModal(template: TemplateRef<any>) {
    this.coinGeckoService.getAllCoinNamesAndIds().subscribe(coinList => {
      if(this.coinNameSearch == '' || this.coinNameSearch == null) {
        this.allCoinNameIdsList = coinList;
        this.filteredCoinNameIdsList = coinList; // TODO - show selected coins
      } else {
        this.allCoinNameIdsList = coinList;
        this.filterSearchedCoins();
      }
    });

    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    // this.coinGeckoService.getAllCoinNamesAndIds().subscribe(coinList => {
    //   if(this.coinNameSearch !== '' && this.coinNameSearch !== null) {
    //     this.coinNameIdsList = coinList.filter(c => c.name == this.coinNameSearch)
    //   } else {
    //     this.coinNameIdsList = coinList;
    //   }
    // });
  }

  onAddCoin(coinNameId: string){
    this.apiHelperService.addAddedCoin(this.coinNameSearch).subscribe(res => {
      if(res == 1) {
        this.appStateService.sendNewCoinIdSubject(coinNameId);
      } else {
        alert("something went wrong while insert added coin");
      }
    });
  }

  onSearchChnage(event){
    console.log(event);
    console.log(this.coinNameSearch);
    this.filterSearchedCoins();
  }

  private filterSearchedCoins(){
    this.filteredCoinNameIdsList = this.allCoinNameIdsList.filter(c => 
        c.name.toLowerCase().includes(this.coinNameSearch.toLowerCase()) // make it so it gets best "includes"
      );
  }

}
