import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

// The God-Level Bypass: We build the loader ourselves so it never crashes
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Core Angular Performance Optimizations
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // 2. High-End Animations Engine
    provideAnimations(),
    
    // 3. Routing
    provideRouter(routes),
    
    // 4. Modern HTTP Client
    provideHttpClient(withInterceptorsFromDi()),
    
    // 5. Internationalization (i18n) Engine using our Custom Loader
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader,
          deps: [HttpClient]
        }
      })
    )
  ]
};