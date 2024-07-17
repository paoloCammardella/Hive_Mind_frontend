import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaRequest } from './idea-request.type';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Idea } from '../../_model/Idea';
import { environment } from '../../../environments/environment.development';

enum IdeasType { popular = 'popular', unpopular = 'unpopular', controversial = 'controversial' };

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private http: HttpClient) {}

  getIdeas(ideaType: string): Observable<Idea[]> {
    if (Object.values(IdeasType).includes(ideaType as IdeasType)) {
      console.log(ideaType);
      const url = environment.idea.idea + '/' + ideaType;
      return this.http.get<Idea[]>(url).pipe(
        catchError(this.handleError)
      );
    } else {
      return throwError(() => new Error("No category found"));
    }
  }

  saveIdea(ideaRequest: IdeaRequest): Observable<any> {
    console.log(ideaRequest);
    const url = environment.idea.idea;
    return this.http.post(url, ideaRequest).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
