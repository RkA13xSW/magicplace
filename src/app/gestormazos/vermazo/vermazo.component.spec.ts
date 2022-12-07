import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VermazoComponent } from './vermazo.component';

describe('VermazoComponent', () => {
  let component: VermazoComponent;
  let fixture: ComponentFixture<VermazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VermazoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VermazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
