import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  total = 0;
  parcelForm!: FormGroup;
  private modalSubscription!: Subscription;
  private formSubscription!: Subscription;

  constructor(
    private modalService: ModalService, 
    private fb: FormBuilder,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.displayParcelModal$.subscribe(s => this.display = s);
    
    this.parcelForm = this.fb.group({
      trackingNumber: ['', Validators.required],
      storeName: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
      description: ['']
    });
    
    this.onChanges(); // Call onChanges to activate the total calculation
  }

  createItem(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  get items(): FormArray {
    return this.parcelForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItem());
    setTimeout(() => this.scrollToBottom(), 100);
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }
  
  onChanges(): void {
    this.formSubscription = this.parcelForm.valueChanges.subscribe(val => {
      this.total = val.items.reduce(
        (acc: number, item: { price: number; quantity: number }) => acc + ((item.price || 0) * (item.quantity || 0)),
        0
      );
    });
  }

  private getItemsContainer(): HTMLElement | null {
    return this.el.nativeElement.querySelector('.items-list-container');
  }

  scrollToTop() {
    const container = this.getItemsContainer();
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToBottom() {
    const container = this.getItemsContainer();
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  close() {
    this.modalService.close('parcelModal');
    this.parcelForm.reset();
    this.items.clear();
    this.addItem();
  }

  onSubmit() {
    if (this.parcelForm.valid) {
      console.log(this.parcelForm.value);
      this.close();
    }
  }
}