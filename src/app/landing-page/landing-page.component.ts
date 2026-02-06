import { AfterViewInit, Component } from '@angular/core';
import { ScrollingBannerComponent } from '../scrolling-banner/scrolling-banner.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FocusService } from '../services/focus-service/focus-service';

declare var particlesJS: any;

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ScrollingBannerComponent, TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements AfterViewInit {
  constructor(
    private translate: TranslateService,
    private focusService: FocusService
    
  ) {}

  scrollToContactForm(): void {
    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
    this.focusService.triggerFocus();
  }

    ngAfterViewInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }
}
