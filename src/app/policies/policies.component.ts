import { Component } from '@angular/core';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

/**
 * Policies page component.
 * Displays legal information (imprint and privacy policy).
 * Accessed via footer links, separate route from main portfolio.
 */
@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [ImprintComponent, PrivacyPolicyComponent, TranslateModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  /**
   * @param {TranslateService} translate - ngx-translate service for i18n
   */
  constructor(private translate: TranslateService) {}
}
