import { Service, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '../auth/auth.store';

@Service()
export class Skill {
  private readonly apiURL = environment.apiUrl;


  private authStore = inject(AuthStore)
  constructor(private http: HttpClient) {

  }

  getAllSkills() {

  }


  getCompanySkills() {
    const authUser = this.authStore.user();
    const companyId = authUser?.companyStaff?.company_id;
    return this.http.get(`${this.apiURL}/${companyId}/skills`)

  }
}
