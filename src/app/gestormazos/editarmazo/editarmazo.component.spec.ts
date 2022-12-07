import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarmazoComponent } from './editarmazo.component';

describe('EditarmazoComponent', () => {
  let component: EditarmazoComponent;
  let fixture: ComponentFixture<EditarmazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarmazoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarmazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
