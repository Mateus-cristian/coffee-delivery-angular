import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCoffeeComponent } from './card-coffee.component';

describe('CardCoffeeComponent', () => {
  let component: CardCoffeeComponent;
  let fixture: ComponentFixture<CardCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCoffeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
