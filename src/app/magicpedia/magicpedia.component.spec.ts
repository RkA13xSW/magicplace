import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicpediaComponent } from './magicpedia.component';

describe('MagicpediaComponent', () => {
  let component: MagicpediaComponent;
  let fixture: ComponentFixture<MagicpediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicpediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicpediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
