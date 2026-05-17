import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, afterNextRender, signal, viewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';

declare global {
  interface Window {
    gsap?: {
      fromTo: (...args: unknown[]) => void;
    };
  }
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  private readonly links = viewChildren<ElementRef<HTMLElement>>('liquidLink');
  readonly isDark = signal(false);
  readonly currentLanguage = signal<'en' | 'fr' | 'ar'>('en');

  readonly navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Products', route: '/products' },
    { label: 'Cart', route: '/cart' },
    { label: 'Login', route: '/login' },
    { label: 'Register', route: '/register' },
    { label: 'Admin', route: '/admin' }
  ];

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    afterNextRender(() => this.initializeGsapHover());
  }

  toggleTheme(): void {
    this.isDark.update((value) => !value);
    this.document.documentElement.classList.toggle('dark', this.isDark());
  }

  changeLanguage(value: string): void {
    if (value === 'ar') {
      this.currentLanguage.set('ar');
      this.document.documentElement.dir = 'rtl';
      return;
    }

    this.document.documentElement.dir = 'ltr';
    this.currentLanguage.set(value === 'fr' ? 'fr' : 'en');
  }

  private initializeGsapHover(): void {
    if (!window.gsap) return;
    this.links().forEach((linkRef) => {
      const element = linkRef.nativeElement;
      element.addEventListener('mouseenter', () => {
        window.gsap?.fromTo(
          element,
          { backgroundPositionX: '120%' },
          { backgroundPositionX: '0%', duration: 0.6 }
        );
      });
    });
  }
}
