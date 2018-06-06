import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebounceObsInputComponent } from './debounce-obs-input.component';

xdescribe('DebounceObsInputComponent', () => {
  let component: DebounceObsInputComponent;
  let fixture: ComponentFixture<DebounceObsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebounceObsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebounceObsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
