import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meditation } from '../models/meditation.model';

@Injectable({
  providedIn: 'root'
})
export class MeditationService {
  constructor(private http: HttpClient) { }

  private baseUrl: string = "https://localhost:7045/api/Meditation";

  getAllSessionGroup() : Observable<Meditation[]>
  {
    return this.http.get<Meditation[]>(this.baseUrl + "/all");
  }

  addSessionGroup(meditObj:any)
  {
    return this.http.post<any>(this.baseUrl + "/add", meditObj);
  }

  editSessionGroup(meditObj: Meditation){
    return this.http.post<Meditation>(this.baseUrl + "/edit", meditObj);
  }

  deleteMeditation(id:number) : Observable<any> {
    return this.http.delete<Meditation>(this.baseUrl + "/delete/" + id);
  }

  getByIdMeditation(id:number){
    return this.http.get<Meditation>(this.baseUrl + "/getbyid/" + id);
  }

  getRecomendationByName(meditId: number){
    return this.http.get<Meditation[]>(this.baseUrl + "/recomend/" + meditId);
  }
}
