import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfo1Component } from './plant-info1.component';

describe('PlantInfo1Component', () => {
  let component: PlantInfo1Component;
  let fixture: ComponentFixture<PlantInfo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantInfo1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInfo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
