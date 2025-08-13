import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { GeminiService } from '../../services/gemini.service';
import { Subscription, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-smart-status-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-status-modal.component.html',
})
export class SmartStatusModalComponent implements OnInit, OnDestroy {
  data: any = null;
  loading = false;
  smartStatus = '';
  private modalSubscription!: Subscription;
  constructor(private modalService: ModalService, private geminiService: GeminiService) {}
  ngOnInit() {
    this.modalSubscription = this.modalService.displaySmartStatusModal$.pipe(
      tap(data => { this.data = data; this.smartStatus = ''; }),
      switchMap(data => {
        if (data) {
          this.loading = true;
          const { trackingId, from, to, status } = data;
          const prompt = `Generate a friendly, one-sentence status update for a parcel with these details: Tracking ID: ${trackingId}, From: ${from}, To: ${to}, Current Status: "${status}".`;
          return this.geminiService.generateContent(prompt);
        }
        return of(null);
      })
    ).subscribe(status => { if (status) { this.smartStatus = status; this.loading = false; } });
  }
  ngOnDestroy() { this.modalSubscription.unsubscribe(); }
  close() { this.modalService.close('smartStatusModal'); }
}