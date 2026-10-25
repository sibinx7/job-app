import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobSearch } from './job-search';

describe('JobSearch', () => {
  let component: JobSearch;
  let fixture: ComponentFixture<JobSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(JobSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
