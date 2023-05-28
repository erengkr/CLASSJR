import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NgForm} from '@angular/forms';
import { VeliKayitComponent } from './veli-kayit.component';

describe('VeliKayitComponent', () => {
  let component: VeliKayitComponent;
  let fixture: ComponentFixture<VeliKayitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeliKayitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeliKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
