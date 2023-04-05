import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    const nav = document.querySelector('nav');
    this.renderer.listen('window', 'scroll', () => {
      if (window.pageYOffset > 100) {
        this.renderer.addClass(nav, 'bg-dark');
        this.renderer.addClass(nav, 'shadow');
      } else {
        this.renderer.removeClass(nav, 'bg-dark');
        this.renderer.removeClass(nav, 'shadow');
      }
    });
  }
  ngOnDestroy() {
    // Видалення прослуховувача подій при знищенні компоненту
    this.renderer.destroy();
  }
  scrollToFirstSection() {
    const section = this.elementRef.nativeElement.querySelector('#section1');
    section.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToSecondSection() {
    const section = this.elementRef.nativeElement.querySelector('#section2');
    section.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToThirdSection() {
    const section = this.elementRef.nativeElement.querySelector('#section3');
    section.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToFourSection() {
    const section = this.elementRef.nativeElement.querySelector('#section4');
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
