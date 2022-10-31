import { ReversePipe } from './reverse.pipe';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';



describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });

  it('should transform "1234" to "4321"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('1234');
    expect(rta).toEqual('4321');
  });

});


@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input [(ngModel)]="text">
    <p>{{ text | reverse }}</p>
  `
})
class HostComponent {
  text = '';
}


describe('Test for Reverse Pipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should h5 be "roma"', () => {
    const h5De = fixture.debugElement.query(By.css('h5'));
    expect(h5De.nativeElement.textContent).toEqual('roma');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    const pDe = fixture.debugElement.query(By.css('p'));
    expect(pDe.nativeElement.textContent).toEqual('');

    inputEl.value = 'Soy yo';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDe.nativeElement.textContent).toEqual('oy yoS');

  });

});
























