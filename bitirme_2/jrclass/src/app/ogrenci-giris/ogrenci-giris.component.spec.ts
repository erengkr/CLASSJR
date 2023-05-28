import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrenciGirisComponent } from './ogrenci-giris.component';

describe('OgrenciGirisComponent', () => {
  let component: OgrenciGirisComponent;
  let fixture: ComponentFixture<OgrenciGirisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgrenciGirisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OgrenciGirisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
