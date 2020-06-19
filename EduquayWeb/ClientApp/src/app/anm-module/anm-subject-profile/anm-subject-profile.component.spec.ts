import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmSubjectProfileComponent } from './anm-subject-profile.component';

describe('AnmSubjectProfileComponent', () => {
  let component: AnmSubjectProfileComponent;
  let fixture: ComponentFixture<AnmSubjectProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnmSubjectProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnmSubjectProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
