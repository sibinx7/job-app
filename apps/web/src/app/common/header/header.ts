import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {AuthStore} from "../../auth/auth.store";


@Component({
  imports: [RouterLink, RouterLinkActive],
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
