import { Component, AfterViewInit } from '@angular/core';
import { SectionCardComponent } from '../section-card/section-card.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SectionCardComponent, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent implements AfterViewInit {
  constructor(private translate: TranslateService) {}

  hovered = false;

  onMouseEnter() {
    if (!this.hovered) {
      this.hovered = true;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
