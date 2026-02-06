import { Component, AfterViewInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Aos from 'aos';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PopupComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  constructor(private translate: TranslateService) {}

  ngAfterViewInit(): void {
    setTimeout(() => Aos.refresh(), 200);
  }
}
