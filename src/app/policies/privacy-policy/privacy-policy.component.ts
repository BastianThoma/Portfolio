import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

/**
 * Privacy Policy component.
 * Displays GDPR-compliant privacy information.
 * Explains data collection, usage, and user rights.
 */
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {}
}
