import { Component } from '@angular/core';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [ImprintComponent, PrivacyPolicyComponent, TranslateModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  constructor(private translate: TranslateService) {}
}
