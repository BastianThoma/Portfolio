import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scrolling-banner',
  standalone: true, // Macht die Komponente zu einer Standalone-Komponente
  imports: [CommonModule], // Importiere benötigte Angular-Module
  templateUrl: '/src/app/scrolling-banner/scrolling-banner.component.html',
  styleUrls: ['/src/app/scrolling-banner/scrolling-banner.component.scss']
})
export class ScrollingBannerComponent {
  originalItems = [
    { type: 'text', content: 'Frontend Developer' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.svg' },
    { type: 'text', content: 'Based in Bispingen' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.svg' },
    { type: 'text', content: 'Available for remote work' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.svg' },
    { type: 'text', content: 'Open to work' },
    { type: 'image', content: '/assets/img/radio_button_unchecked.svg' },
  ];
  bannerItems = [...this.originalItems, ...this.originalItems];
}

