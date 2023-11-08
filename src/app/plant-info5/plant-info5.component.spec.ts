import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfo5Component } from './plant-info5.component';

describe('PlantInfo5Component', () => {
  let component: PlantInfo5Component;
  let fixture: ComponentFixture<PlantInfo5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantInfo5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInfo5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
