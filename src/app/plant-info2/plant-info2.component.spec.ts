import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfo2Component } from './plant-info2.component';

describe('PlantInfo2Component', () => {
  let component: PlantInfo2Component;
  let fixture: ComponentFixture<PlantInfo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantInfo2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
