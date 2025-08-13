import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParcelModalComponent } from './create-parcel-modal.component';

describe('CreateParcelModalComponent', () => {
  let component: CreateParcelModalComponent;
  let fixture: ComponentFixture<CreateParcelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateParcelModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateParcelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
