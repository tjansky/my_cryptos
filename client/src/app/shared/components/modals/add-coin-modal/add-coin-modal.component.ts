import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddCoinModalContentComponent } from './add-coin-modal-content/add-coin-modal-content.component';

@Component({
  selector: 'app-add-coin-modal',
  templateUrl: './add-coin-modal.component.html',
  styleUrls: ['./add-coin-modal.component.css']
})
export class AddCoinModalComponent {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(AddCoinModalContentComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
 
