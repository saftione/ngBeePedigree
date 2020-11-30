import { Injectable } from "@angular/core";
import { HttpClient, HttpParams , HttpHeaders, HttpErrorResponse} from "@angular/common/http";

import { environment } from '../../environments/environment';

const baseUrl = `${environment.API_URL}/api/pedigrees`;

@Injectable({
  providedIn: 'root'
})
export class PedigreeService {


  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get(baseUrl);
  }


  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title) {
    return this.http.get(`${baseUrl}?title=${name}`);
  }
}
