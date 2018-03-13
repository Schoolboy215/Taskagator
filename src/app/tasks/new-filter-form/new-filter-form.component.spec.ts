import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFilterFormComponent } from './new-filter-form.component';

describe('NewFilterFormComponent', () => {
  let component: NewFilterFormComponent;
  let fixture: ComponentFixture<NewFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
