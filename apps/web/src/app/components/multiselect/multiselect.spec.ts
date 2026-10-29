import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Multiselect } from './multiselect';

describe('Multiselect', () => {
  let component: Multiselect;
  let fixture: ComponentFixture<Multiselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Multiselect],
    }).compileComponents();

    fixture = TestBed.createComponent(Multiselect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
