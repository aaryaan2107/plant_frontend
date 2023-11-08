import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfo6Component } from './plant-info6.component';

describe('PlantInfo6Component', () => {
  let component: PlantInfo6Component;
  let fixture: ComponentFixture<PlantInfo6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantInfo6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInfo6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
