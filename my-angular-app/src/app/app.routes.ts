import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParcelsComponent } from './parcels/parcels.component';
import { AddressesComponent } from './addresses/addresses.component';
import { BillingComponent } from './billing/billing.components';
import { AccountComponent } from './account/account.component';
import { SupportComponent } from './support/support.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'parcels', component: ParcelsComponent },
  { path: 'addresses', component: AddressesComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'account', component: AccountComponent },
  { path: 'support', component: SupportComponent },
];
