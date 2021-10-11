import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsNewsComponent } from './cards-news.component';

describe('CardsNewsComponent', () => {
  let component: CardsNewsComponent;
  let fixture: ComponentFixture<CardsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
