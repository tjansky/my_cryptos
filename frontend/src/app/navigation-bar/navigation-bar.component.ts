import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../shared/services/api-helper.service';
import { AppStateService } from '../shared/services/app-state.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private apiHelperService: ApiHelperService,private appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  onCoinAdd(coinId){
    this.apiHelperService.addAddedCoin(coinId).subscribe(res => {
      if(res == 1) {
        this.appStateService.sendNewCoinIdSubject(coinId);
      } else {
        alert("something went wrong while insert added coin");
      }
    });
  }

  onTransactionAdd(){

  }

  onCoinDelete(){

  }

  onTransactionDelete(){
    
  }

}
