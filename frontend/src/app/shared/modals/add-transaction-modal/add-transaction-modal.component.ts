import { Input, TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Coin } from '../../models/Coin';

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.css']
})
export class AddTransactionModalComponent implements OnInit {
  @Input() coin: Coin; 
  activeForm = 1;

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

  onFormSelection(formId: number){
    switch(formId) {
      case 1: {
        // buy form
        this.activeForm = 1;
        break;
      }
      case 2: {
        // sell form
        this.activeForm = 2;
        break;
      }
      case 3: {
        // transfer form
        this.activeForm = 3;
        break;
      }
      default: {
        // default is buy form
        this.activeForm = 1;
        break;
      }
    }

  }
}
