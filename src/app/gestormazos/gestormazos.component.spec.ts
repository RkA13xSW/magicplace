import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestormazosComponent } from './gestormazos.component';

describe('GestormazosComponent', () => {
  let component: GestormazosComponent;
  let fixture: ComponentFixture<GestormazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestormazosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestormazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
