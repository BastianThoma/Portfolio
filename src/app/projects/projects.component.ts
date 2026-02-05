import { Component, AfterViewInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';

/**
 * Projects portfolio section component.
 * Displays project cards and integrates popup for detailed views.
 * Refreshes AOS animations after view initialization.
 * 
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PopupComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {}

  /**
   * Lifecycle hook that refreshes AOS animations.
   * Ensures project cards animate correctly on scroll.
   */
  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
