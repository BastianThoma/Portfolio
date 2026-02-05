import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Aos from 'aos';

/**
 * Root application component.
 * Initializes AOS (Animate On Scroll) library and translation service.
 * Handles global window resize events to refresh animations.
 * 
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  /**
   * Initializes translation service with available languages.
   * Sets English as default language.
   * 
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  /** Application title displayed in browser tab */
  title = 'Portfolio';

  /**
   * Lifecycle hook that initializes AOS library.
   * Configures animation easing for smooth transitions.
   */
  ngOnInit(): void {
    Aos.init({
      easing: 'ease-in-out',
    });
  }

  /**
   * Lifecycle hook that refreshes AOS after initial render.
   * Ensures animations trigger correctly after DOM stabilizes.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      Aos.refresh();
    }, 300);
  }

  /**
   * Window resize event handler.
   * Refreshes AOS animations to maintain proper positioning.
   */
  @HostListener('window:resize')
  onResize() {
    Aos.refresh();
  }

  /**
   * Switches application language.
   * 
   * @param {string} lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
