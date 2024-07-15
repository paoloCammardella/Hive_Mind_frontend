import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaRequest } from './idea-request.type';
import { catchError, Observable, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  url = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  getIdeas(ideaType: string) {
    if (ideaType) {
      if (ideaType === 'controversial') {
        const url = `${this.url}/ideas/Controversial`;
        return this.http.get(url);
      } else if (ideaType === 'unpopular') {
        const url = `${this.url}/ideas/Unpopular`;
        return this.http.get(url);
      } else if (ideaType === 'popular') {
        const url = `${this.url}/ideas/Popular`;
        return this.http.get(url);
      }
    }
    //TODO: Aggiusta questo metodo
    return console.log(ideaType);
  }

  saveIdea(ideaRequest: IdeaRequest) {
    console.log(ideaRequest);
    const url = `${this.url}/idea`;
    return this.http.post(url, ideaRequest);
  }

}
