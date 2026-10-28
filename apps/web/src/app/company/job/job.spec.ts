import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Job } from './job';

describe('Job', () => {
  let component: Job;
  let fixture: ComponentFixture<Job>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Job],
    }).compileComponents();

    fixture = TestBed.createComponent(Job);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
