import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

/**
 * Infinite scrolling banner component.
 * Displays repeating information about developer's status and availability.
 * Uses CSS animation for continuous horizontal scroll effect.
 */
@Component({
  selector: 'app-scrolling-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: '/src/app/scrolling-banner/scrolling-banner.component.html',
  styleUrls: ['/src/app/scrolling-banner/scrolling-banner.component.scss'],
})
export class ScrollingBannerComponent {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {}

  /**
   * Original banner items (text and decorative images).
   * Text items reference translation keys for multilingual support.
   */
  originalItems = [
    { type: 'text', content: 'SCROLLING_BANNER.FRONTEND_DEVELOPER' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.png' },
    { type: 'text', content: 'SCROLLING_BANNER.BASED_IN' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.png' },
    { type: 'text', content: 'SCROLLING_BANNER.AVAILABILITY' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.png' },
    { type: 'text', content: 'SCROLLING_BANNER.OPEN_TO_WORK' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.png' },
  ];
  
  /**
   * Duplicated banner items for seamless infinite scroll effect.
   * CSS animation loops through this array to create continuous motion.
   */
  bannerItems = [...this.originalItems, ...this.originalItems];
}
