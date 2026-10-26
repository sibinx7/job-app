export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  isAdmin: boolean;
  profile_image?: string;

}
