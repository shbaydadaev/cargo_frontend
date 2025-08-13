import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartStatusModalComponent } from './smart-status-modal.component';

describe('SmartStatusModalComponent', () => {
  let component: SmartStatusModalComponent;
  let fixture: ComponentFixture<SmartStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartStatusModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
