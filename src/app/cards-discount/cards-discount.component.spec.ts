import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDiscountComponent } from './cards-discount.component';

describe('CardsDiscountComponent', () => {
  let component: CardsDiscountComponent;
  let fixture: ComponentFixture<CardsDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
