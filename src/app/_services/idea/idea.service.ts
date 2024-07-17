import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaRequest } from './idea-request.type';
import { Observable, throwError } from 'rxjs';
import { Idea } from '../../_model/Idea';

enum IdeasType { 'popular', 'unpopular', 'controversial' };

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  url = "http://localhost:3000";


  constructor(private http: HttpClient) {
  }

  getIdeas(ideaType: string): Observable<Idea[]> {
    if (ideaType in IdeasType) {
      console.log(ideaType);
      const url = `${this.url}/idea/${ideaType}`;
      return this.http.get<Idea[]>(url);
    } else {
      return throwError(() => new Error("No category found"));
    }
  }

  saveIdea(ideaRequest: IdeaRequest) {
    console.log(ideaRequest);
    const url = `${this.url}/idea`;
    return this.http.post(url, ideaRequest);
  }

}
