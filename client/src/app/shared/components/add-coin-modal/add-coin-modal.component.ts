import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CryptoDataService } from 'src/app/portfolio/crypto-data.service';
import { ICoinIdentifier } from '../../models/ICoinIdentifier';

@Component({
  selector: 'app-add-coin-modal',
  templateUrl: './add-coin-modal.component.html',
  styleUrls: ['./add-coin-modal.component.css']
})
export class AddCoinModalComponent {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Add New Coin :)'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
 
/* This is a component which we pass in modal*/
 
@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
      <div *ngFor="let shortCoin of coinNamesAndIds$ | async">
      {{shortCoin.name}} <button (click)="onNewCoinAdd(shortCoin.id)" type="button">Add</button>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
 
export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  coinNamesAndIds$: Observable<ICoinIdentifier[]>
 
  constructor(public bsModalRef: BsModalRef, private cryptoDataService: CryptoDataService) {}
 
  ngOnInit() {
    this.coinNamesAndIds$ = this.cryptoDataService.getAllCoinNamesAndIds()
  }

  onNewCoinAdd(newCoinId: string) {
    console.log("IM ADDING TO TRACK COIN WITH ID: ", newCoinId);
  }
}
