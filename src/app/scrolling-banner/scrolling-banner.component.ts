import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-scrolling-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: '/src/app/scrolling-banner/scrolling-banner.component.html',
  styleUrls: ['/src/app/scrolling-banner/scrolling-banner.component.scss'],
})
export class ScrollingBannerComponent {
  constructor(private translate: TranslateService) {}

  originalItems = [
    { type: 'text', content: 'SCROLLING_BANNER.FRONTEND_DEVELOPER' },
    { type: 'image', content: '/assets/img/point.svg' },
    { type: 'text', content: 'SCROLLING_BANNER.BASED_IN' },
    { type: 'image', content: '/assets/img/point.svg' },
    { type: 'text', content: 'SCROLLING_BANNER.AVAILABILITY' },
    { type: 'image', content: '/assets/img/point.svg' },
    { type: 'text', content: 'SCROLLING_BANNER.OPEN_TO_WORK' },
    { type: 'image', content: '/assets/img/point.svg' },
  ];
  bannerItems = [...this.originalItems, ...this.originalItems];
}
