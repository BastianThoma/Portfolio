import { Component, AfterViewInit } from '@angular/core';
import { SectionCardComponent } from '../section-card/section-card.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';

/**
 * About Me section component.
 * Displays personal introduction, portrait, and key highlights.
 * Features hover effects on portrait image.
 * 
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SectionCardComponent, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent implements AfterViewInit {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {}

  /** Tracks hover state for portrait image effects */
  hovered = false;

  /**
   * Handles mouse enter event on portrait.
   * Triggers animation only on first hover to avoid performance issues.
   */
  onMouseEnter() {
    if (!this.hovered) {
      this.hovered = true;
    }
  }

  /**
   * Lifecycle hook that refreshes AOS animations.
   * Ensures about section animates correctly on scroll.
   */
  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
