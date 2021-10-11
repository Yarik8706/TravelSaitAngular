import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTourComponent } from './card-tour.component';

describe('CardTourComponent', () => {
  let component: CardTourComponent;
  let fixture: ComponentFixture<CardTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
