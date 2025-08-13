import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateParcelModalComponent } from './modals/create-parcel-modal/create-parcel-modal.component';
import { CreateOrderModalComponent } from './modals/create-order-modal/create-order-modal.component';
import { SmartStatusModalComponent } from './modals/smart-status-modal/smart-status-modal.component';
import { AddFundsModalComponent } from './modals/add-funds-modal/add-funds-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    SidebarComponent,
    CreateParcelModalComponent,
    CreateOrderModalComponent,
    SmartStatusModalComponent,
    AddFundsModalComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'active-cargo-app';
}
