import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiHelperService } from '../../services/api-helper.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-add-coin-modal',
  templateUrl: './add-coin-modal.component.html',
  styleUrls: ['./add-coin-modal.component.css']
})
export class AddCoinModalComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private apiHelperService: ApiHelperService, private appStateService: AppStateService) {}

  coinNameSearch: string;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

  onAddCoin(){
    this.apiHelperService.addAddedCoin(this.coinNameSearch).subscribe(res => {
      if(res == 1) {
        this.appStateService.sendNewCoinIdSubject(this.coinNameSearch);
      } else {
        alert("something went wrong while insert added coin");
      }
    });
  }

}
