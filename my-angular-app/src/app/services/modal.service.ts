import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private displayParcelModal = new BehaviorSubject<boolean>(false);
  private displayOrderModal = new BehaviorSubject<boolean>(false);
  private displaySmartStatusModal = new BehaviorSubject<any>(null);
  private displayAddFundsModal = new BehaviorSubject<boolean>(false);

  displayParcelModal$ = this.displayParcelModal.asObservable();
  displayOrderModal$ = this.displayOrderModal.asObservable();
  displaySmartStatusModal$ = this.displaySmartStatusModal.asObservable();
  displayAddFundsModal$ = this.displayAddFundsModal.asObservable();

  open(modalId: string, data?: any) {
    if (modalId === 'parcelModal') this.displayParcelModal.next(true);
    if (modalId === 'orderModal') this.displayOrderModal.next(true);
    if (modalId === 'smartStatusModal') this.displaySmartStatusModal.next(data);
    if (modalId === 'addFundsModal') this.displayAddFundsModal.next(true);
  }

  close(modalId: string) {
    if (modalId === 'parcelModal') this.displayParcelModal.next(false);
    if (modalId === 'orderModal') this.displayOrderModal.next(false);
    if (modalId === 'smartStatusModal') this.displaySmartStatusModal.next(null);
    if (modalId === 'addFundsModal') this.displayAddFundsModal.next(false);
  }
}