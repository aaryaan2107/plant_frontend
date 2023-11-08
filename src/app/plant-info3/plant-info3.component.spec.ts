import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfo3Component } from './plant-info3.component';

describe('PlantInfo3Component', () => {
  let component: PlantInfo3Component;
  let fixture: ComponentFixture<PlantInfo3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantInfo3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInfo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
