import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-profile-avatar',
  styleUrl: './profile-avatar.scss',
  templateUrl: './profile-avatar.html',
})
export class ProfileAvatar {
  @Input('fullName') fullName: string = '';

  get getAvatar(): string {
    return this.fullName.split(' ').map((n) => n[0]).join('').toUpperCase();
  }
}
