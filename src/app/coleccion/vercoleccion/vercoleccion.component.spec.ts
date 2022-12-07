import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercoleccionComponent } from './vercoleccion.component';

describe('VercoleccionComponent', () => {
  let component: VercoleccionComponent;
  let fixture: ComponentFixture<VercoleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VercoleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VercoleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
