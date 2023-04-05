import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://localhost:7045/api/Session";

  getAllSessionByGroup(groupId: number) : Observable<Session[]>
  {
    const url = `${this.baseUrl}/group/${groupId}`; 
    return this.http.get<Session[]>(url);
  }

  addSession(meditObj:any, groupId: number){
    return this.http.post<any>(this.baseUrl + "/add/" + groupId, meditObj);
  }
}
