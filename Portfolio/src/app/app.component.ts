import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainContentComponent,
    NavbarComponent,
    FooterComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Portfolio';

  constructor(private translate: TranslateService) {
    // Unterstützte Sprachen definieren
    this.translate.addLangs(['en', 'de']);

    // Standardsprache auf Englisch setzen
    this.translate.setDefaultLang('en');
    this.translate.use('en'); // Englische Sprache verwenden

    // Optional: Wenn du die Browser-Sprache verwenden möchtest, aber nicht überschreiben willst
    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
  }

  // Methode für den Sprachwechsel
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
