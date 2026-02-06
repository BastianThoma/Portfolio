import { AfterViewInit, Component } from '@angular/core';
import { ScrollingBannerComponent } from '../scrolling-banner/scrolling-banner.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';

/** External particles.js library declaration */
declare var particlesJS: any;

/**
 * Landing page hero section component.
 * Features animated particle background and call-to-action buttons.
 * Integrates particles.js for visual effects.
 * 
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ScrollingBannerComponent, TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements AfterViewInit {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   * @param {FocusService} focusService - Service for focusing contact form
   */
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
    
  ) {}

  /**
   * Smoothly scrolls to contact form and focuses name input.
   * Used by "Contact Me" call-to-action button.
   */
  scrollToContactForm(): void {
    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
    this.focusService.triggerFocus();
  }

  /**
   * Lifecycle hook that initializes particles.js animation.
   * Loads configuration from external JSON file.
   */
  ngAfterViewInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }
}
