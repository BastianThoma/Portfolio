import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-scrolling-banner',
  standalone: true, // Macht die Komponente zu einer Standalone-Komponente
  imports: [CommonModule, TranslateModule], // Importiere benötigte Angular-Module
  templateUrl: '/src/app/scrolling-banner/scrolling-banner.component.html',
  styleUrls: ['/src/app/scrolling-banner/scrolling-banner.component.scss']
})
export class ScrollingBannerComponent {
  constructor(private translate: TranslateService) {}

  originalItems = [
    { type: 'text', content: 'SCROLLING_BANNER.FRONTEND_DEVELOPER' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.svg' },
    { type: 'text', content: 'SCROLLING_BANNER.BASED_IN' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.svg' },
    { type: 'text', content: 'SCROLLING_BANNER.AVAILABILITY' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.svg' },
    { type: 'text', content: 'SCROLLING_BANNER.OPEN_TO_WORK' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.svg' },
  ];
  bannerItems = [...this.originalItems, ...this.originalItems];
}

