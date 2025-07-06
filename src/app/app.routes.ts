import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { PoliciesComponent } from './policies/policies.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent},
    { path: 'imprint', component: PoliciesComponent},
    { path: 'privacy-policy', component: PoliciesComponent},
];
