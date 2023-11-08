import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentorderComponent } from './currentorder.component';

describe('CurrentorderComponent', () => {
  let component: CurrentorderComponent;
  let fixture: ComponentFixture<CurrentorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
