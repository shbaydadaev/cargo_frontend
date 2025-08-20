import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-funds-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-funds-modal.component.html',
})
export class AddFundsModalComponent implements OnInit, OnDestroy {
  display = false;
  fundsForm!: FormGroup;
  private modalSubscription!: Subscription;
  constructor(private modalService: ModalService, private fb: FormBuilder) {}
  ngOnInit() {
    this.modalSubscription = this.modalService.displayAddFundsModal$.subscribe(s => this.display = s);
    this.fundsForm = this.fb.group({ 
        amount: [null, [Validators.required, Validators.min(1)]],
        paymentMethod: ['visa', Validators.required]
    });
  }
  ngOnDestroy() { this.modalSubscription.unsubscribe(); }
  close() { this.modalService.close('addFundsModal'); }
  onSubmit() { if (this.fundsForm.valid) { console.log(this.fundsForm.value); this.close(); } }
}