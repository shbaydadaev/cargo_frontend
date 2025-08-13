import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-parcels',
  standalone: true,
  imports: [],
  templateUrl: './parcels.component.html',
})
export class ParcelsComponent {
  constructor(private modalService: ModalService) {}
  openOrderModal() { this.modalService.open('orderModal'); }
}