import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmViewShipmentdetailsComponent } from './anm-view-shipmentdetails.component';

describe('AnmViewShipmentdetailsComponent', () => {
  let component: AnmViewShipmentdetailsComponent;
  let fixture: ComponentFixture<AnmViewShipmentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnmViewShipmentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnmViewShipmentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
