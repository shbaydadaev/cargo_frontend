import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  tabs = ['All', 'In Warehouse', 'Sent', 'Delivered'];
  activeTab = 'All';
  parcels = [
    { trackingId: 'CF-84610357', from: 'Seoul, KR', to: 'Tashkent, Uzb', date: 'Aug 12, 2025', status: 'Delivered' },
    { trackingId: 'CF-19374628', from: 'Beijing, China', to: 'Tashkent, Uzb', date: 'Aug 10, 2025', status: 'Sent' },
    { trackingId: 'CF-55820194', from: 'Istanbul, Turkey', to: 'Tashkent, Uzb', date: 'Aug 08, 2025', status: 'In Warehouse' },
  ];
  filteredParcels = this.parcels;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.filterParcels();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.filterParcels();
  }

  filterParcels() {
    if (this.activeTab === 'All') {
      this.filteredParcels = this.parcels;
    } else {
      this.filteredParcels = this.parcels.filter(p => p.status === this.activeTab);
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'In Warehouse': return 'bg-orange-100 text-orange-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }

  openParcelModal() { this.modalService.open('parcelModal'); }
  openOrderModal() { this.modalService.open('orderModal'); }
  openSmartStatus(parcel: any) { this.modalService.open('smartStatusModal', parcel); }
}