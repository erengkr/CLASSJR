import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrenciListeComponent } from './ogrenci-liste.component';

describe('OgrenciListeComponent', () => {
  let component: OgrenciListeComponent;
  let fixture: ComponentFixture<OgrenciListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OgrenciListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OgrenciListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
