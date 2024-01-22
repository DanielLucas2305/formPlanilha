import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostBody } from '../models/sheet.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient) { }

  post(body: PostBody): Observable<PostBody> {
    return this.http.post<PostBody>(environment.API_URL, body);
  }
}
