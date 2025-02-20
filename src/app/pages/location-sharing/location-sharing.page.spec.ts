import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationSharingPage } from './location-sharing.page';

describe('LocationSharingPage', () => {
  let component: LocationSharingPage;
  let fixture: ComponentFixture<LocationSharingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSharingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
