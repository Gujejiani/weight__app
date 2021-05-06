import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { RegistrationComponent } from './registration.component';

const routes: Routes = [{ path: '', component: RegistrationComponent }];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [RouterModule.forChild(routes), FormsModule, SharedModule],
})
export class registrationModule {}
