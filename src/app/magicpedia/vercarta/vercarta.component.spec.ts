import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercartaComponent } from './vercarta.component';

describe('VercartaComponent', () => {
  let component: VercartaComponent;
  let fixture: ComponentFixture<VercartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VercartaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VercartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
