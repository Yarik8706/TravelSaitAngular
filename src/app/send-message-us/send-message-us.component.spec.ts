import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageUsComponent } from './send-message-us.component';

describe('SendMessageUsComponent', () => {
  let component: SendMessageUsComponent;
  let fixture: ComponentFixture<SendMessageUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMessageUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessageUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
