import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFundsModalComponent } from './add-funds-modal.component';

describe('AddFundsModalComponent', () => {
  let component: AddFundsModalComponent;
  let fixture: ComponentFixture<AddFundsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFundsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFundsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
