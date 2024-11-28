import { Component } from '@angular/core';
import { ScrollingBannerComponent } from '../scrolling-banner/scrolling-banner.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ScrollingBannerComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
