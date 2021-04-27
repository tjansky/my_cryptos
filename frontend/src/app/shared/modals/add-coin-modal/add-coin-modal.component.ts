import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-coin-modal',
  templateUrl: './add-coin-modal.component.html',
  styleUrls: ['./add-coin-modal.component.css']
})
export class AddCoinModalComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
