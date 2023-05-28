import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgretmenKayitComponent } from './ogretmen-kayit.component';

describe('OgretmenKayitComponent', () => {
  let component: OgretmenKayitComponent;
  let fixture: ComponentFixture<OgretmenKayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgretmenKayitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OgretmenKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
