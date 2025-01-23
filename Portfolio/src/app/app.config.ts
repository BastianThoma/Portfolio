import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Funktion für den Übersetzungs-Loader
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// ApplicationConfig mit ngx-translate
export const appConfig: ApplicationConfig = {
  providers: [
    // Routing-Provider
    provideRouter(routes),

    // HTTP-Client-Provider
    provideHttpClient(),

    // Importiere ngx-translate Konfiguration
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en', // Standardsprache
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
