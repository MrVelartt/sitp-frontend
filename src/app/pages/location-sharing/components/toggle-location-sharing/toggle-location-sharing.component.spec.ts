import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToggleLocationSharingComponent } from './toggle-location-sharing.component';

describe('ToggleLocationSharingComponent', () => {
  let component: ToggleLocationSharingComponent;
  let fixture: ComponentFixture<ToggleLocationSharingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ToggleLocationSharingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleLocationSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
