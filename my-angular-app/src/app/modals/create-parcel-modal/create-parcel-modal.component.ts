import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-parcel-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-parcel-modal.component.html',
})
export class CreateParcelModalComponent implements OnInit, OnDestroy {
  display = false;
  parcelForm!: FormGroup;
  private modalSubscription!: Subscription;
  constructor(private modalService: ModalService, private fb: FormBuilder) {}
  ngOnInit() {
    this.modalSubscription = this.modalService.displayParcelModal$.subscribe(s => this.display = s);
    this.parcelForm = this.fb.group({ 
        trackingNumber: ['', Validators.required],
        storeName: ['', Validators.required],
        description: ['']
    });
  }
  ngOnDestroy() { this.modalSubscription.unsubscribe(); }
  close() { this.modalService.close('parcelModal'); }
  onSubmit() { if (this.parcelForm.valid) { console.log(this.parcelForm.value); this.close(); } }
}