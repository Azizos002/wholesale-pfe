import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './shared/footer/footer';
import { NavbarComponent } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.translate.setDefaultLang('en');
    this.applyLanguage('en');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const scrollTrigger = (window as Window & { ScrollTrigger?: { refresh: () => void } }).ScrollTrigger;
        scrollTrigger?.refresh();
      }
    });
  }

  applyLanguage(lang: 'en' | 'fr' | 'ar'): void {
    this.translate.use(lang);

    const html = this.document.documentElement;
    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
      return;
    }

    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', lang);
  }
}
