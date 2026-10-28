import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly API: string = `${environment.apiUrl}/jobs`;
  private readonly http = inject(HttpClient);

  createJob(data: any) {
    return this.http.post(this.API, data);
  }

  getJob(id: number) {
    return this.http.get(`${this.API}/${id}`)
  }

  editJob(id: number, data: any = {}) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deleteJob(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}