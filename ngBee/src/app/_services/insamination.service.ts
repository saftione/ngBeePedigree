import { Injectable } from "@angular/core";
import { HttpClient, HttpParams , HttpHeaders, HttpErrorResponse} from "@angular/common/http";

import { environment } from '../../environments/environment';

const baseUrl = `${environment.API_URL}/api/fertilizations`;
@Injectable({
  providedIn: 'root'
})
export class InsaminationService {


  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get(baseUrl);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

}
