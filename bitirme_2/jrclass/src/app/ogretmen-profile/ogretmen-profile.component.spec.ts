import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgretmenProfileComponent } from './ogretmen-profile.component';

describe('OgretmenProfileComponent', () => {
  let component: OgretmenProfileComponent;
  let fixture: ComponentFixture<OgretmenProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgretmenProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OgretmenProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
