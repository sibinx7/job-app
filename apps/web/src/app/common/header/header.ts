import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {AuthStore} from "../../auth/auth.store";
import { ProfileDropdown } from '../profile-dropdown/profile-dropdown';


@Component({
  imports: [RouterLink, RouterLinkActive, ProfileDropdown],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  readonly authStore = inject(AuthStore);

  isAuthenticated(): boolean {
    return this.authStore.isAuthenticated();
  }
}
