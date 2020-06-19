import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmCollectionComponent } from './anm-collection.component';

describe('AnmCollectionComponent', () => {
  let component: AnmCollectionComponent;
  let fixture: ComponentFixture<AnmCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnmCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnmCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
