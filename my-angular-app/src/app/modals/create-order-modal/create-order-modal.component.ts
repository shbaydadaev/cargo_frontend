import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { GeminiService } from '../../services/gemini.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-order-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-order-modal.component.html',
})
export class CreateOrderModalComponent implements OnInit, OnDestroy {
  display = false;
  orderForm!: FormGroup;
  total = 0;
  loadingDetails: boolean[] = [];
  private modalSubscription!: Subscription;
  private formSubscription!: Subscription;
  constructor(private modalService: ModalService, private geminiService: GeminiService, private fb: FormBuilder) {}
  ngOnInit() {
    this.modalSubscription = this.modalService.displayOrderModal$.subscribe(s => { this.display = s; if (s) this.initForm(); });
  }
  initForm() {
    this.orderForm = this.fb.group({ items: this.fb.array([this.createItem()]) });
    this.onChanges();
  }
  createItem(): FormGroup { return this.fb.group({ productLink: ['', Validators.required], price: [0], quantity: [1] }); }
  get items(): FormArray { return this.orderForm.get('items') as FormArray; }
  addItem() { this.items.push(this.createItem()); }
  removeItem(i: number) { this.items.removeAt(i); }
  onChanges(): void { this.formSubscription = this.orderForm.valueChanges.subscribe(v => { this.total = v.items.reduce((a: number, i: { price: number; quantity: number }) => a + (i.price * i.quantity), 0); }); }
  fetchDetails(i: number) {
  const item = this.items.at(i);
  const link = item.get('productLink')?.value; // Use optional chaining
  if (!link) return;
  this.loadingDetails[i] = true;
  const prompt = `Based on this product URL, generate a JSON object with a "price" (number). URL: ${link}. Respond with only the raw JSON object.`;
  this.geminiService.generateContent(prompt, true).subscribe(
    d => { item.patchValue(d); this.loadingDetails[i] = false; },
    e => { console.error(e); this.loadingDetails[i] = false; }
  );
}
  close() { this.modalService.close('orderModal'); }
  onSubmit() { if (this.orderForm.valid) { console.log(this.orderForm.value); this.close(); } }
  ngOnDestroy() { this.modalSubscription.unsubscribe(); if (this.formSubscription) this.formSubscription.unsubscribe(); }
}