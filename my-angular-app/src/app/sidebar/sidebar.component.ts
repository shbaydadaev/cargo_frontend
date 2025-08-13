import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private modalService: ModalService) {}
  openAddFundsModal() { this.modalService.open('addFundsModal'); }
}