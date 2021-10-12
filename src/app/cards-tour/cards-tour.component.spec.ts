import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTourComponent } from './cards-tour.component';

describe('CardsTourComponent', () => {
  let component: CardsTourComponent;
  let fixture: ComponentFixture<CardsTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
