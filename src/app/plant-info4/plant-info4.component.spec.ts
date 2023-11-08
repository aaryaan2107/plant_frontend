import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantInfo4Component } from './plant-info4.component';

describe('PlantInfo4Component', () => {
  let component: PlantInfo4Component;
  let fixture: ComponentFixture<PlantInfo4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantInfo4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantInfo4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
