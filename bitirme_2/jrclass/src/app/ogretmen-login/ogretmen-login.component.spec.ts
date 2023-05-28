import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgretmenLoginComponent } from './ogretmen-login.component';

describe('OgretmenLoginComponent', () => {
  let component: OgretmenLoginComponent;
  let fixture: ComponentFixture<OgretmenLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgretmenLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OgretmenLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
