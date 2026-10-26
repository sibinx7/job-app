import { Component, computed, inject, OnInit } from '@angular/core';
import { AdminRoutingModule } from '../../admin/admin-routing-module';
import { AuthStore } from '../../auth/auth.store';
import { IUser } from '../../interfaces/iUser';
import { ProfileAvatar } from '../profile-avatar/profile-avatar';

@Component({
  imports: [AdminRoutingModule, ProfileAvatar],
  selector: 'app-profile-dropdown',
  styleUrl: './profile-dropdown.scss',
  templateUrl: './profile-dropdown.html',
})
export class ProfileDropdown implements OnInit {

  public readonly store = inject(AuthStore);
  public readonly user: IUser | null = this.store.user();
  public readonly role = computed(() => this.store.role());

  ngOnInit() {
    console.log(this.user);
    console.log('On page load')
  }

  get fullName() {
    return `${this.user?.first_name} ${this.user?.last_name}`
  }


}
