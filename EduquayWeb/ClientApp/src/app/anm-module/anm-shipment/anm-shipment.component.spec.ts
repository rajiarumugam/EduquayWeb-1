import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmShipmentComponent } from './anm-shipment.component';

describe('AnmShipmentComponent', () => {
  let component: AnmShipmentComponent;
  let fixture: ComponentFixture<AnmShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnmShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnmShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
