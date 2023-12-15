import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompletedSession } from '../models/completed-session.model';
import { Observable } from 'rxjs';
import { AddCompletedSession } from '../models/add-completed-session.model';

@Injectable({
  providedIn: 'root'
})
export class CompletedSessionsService {
  constructor(private http: HttpClient) { }
  private baseUrl: string = "https://localhost:7045/api/CompletedSession";

  addCompletedSession(data: AddCompletedSession) : Observable<AddCompletedSession>
  {
    return this.http.post<AddCompletedSession>(this.baseUrl + "/add", data);
  }
  getUserCompletedSession(userName: string, period: string) : Observable<CompletedSession[]>{
    return this.http.get<CompletedSession[]>(this.baseUrl+"/users/"+userName+"/period/"+period);
  }
}
