import { Component, AfterViewInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';

/**
 * Footer component with navigation links and social media.
 * Provides smooth scroll to top functionality.
 * Displays copyright information and policy links.
 * 
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements AfterViewInit {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {}

  /**
   * Smoothly scrolls page to top.
   * Triggered by clicking footer logo.
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Lifecycle hook that refreshes AOS animations.
   * Ensures footer animates correctly when scrolled into view.
   */
  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
