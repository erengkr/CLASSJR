import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeliProfileComponent } from './veli-profile.component';

describe('VeliProfileComponent', () => {
  let component: VeliProfileComponent;
  let fixture: ComponentFixture<VeliProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeliProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeliProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
