import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from "../../auth/auth.store";
import { ProfileDropdown } from '../profile-dropdown/profile-dropdown';
import { UserRole } from '../../../../../../packages/shared/src/enums/user.enum';
import { IUser } from '../../interfaces/iUser';


@Component({
  imports: [RouterLink, RouterLinkActive, ProfileDropdown],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  readonly authStore = inject(AuthStore);

  public readonly role = computed(() => (this.authStore?.user() as IUser | null)?.role)
  isAuthenticated(): boolean {
    return this.authStore.isAuthenticated();
  }

  get isCompanyStaff() {
    return this.role() === UserRole.COMPANY_STAFF
  }
}
