import { Component } from '@angular/core';
import { ScrollingBannerComponent } from '../scrolling-banner/scrolling-banner.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ScrollingBannerComponent, TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(private translate: TranslateService) {}
}
