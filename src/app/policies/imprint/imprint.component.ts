import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

/**
 * Imprint (Impressum) component.
 * Displays legal contact information required by German law.
 */
@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
})
export class ImprintComponent {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {}
}
