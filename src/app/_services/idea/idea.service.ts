import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaRequest } from './idea-request.type';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { CommentRequest } from './comment-request.type';
import { ContentResponse, Idea } from '../../_model/Idea';

enum IdeasType { popular = 'popular', unpopular = 'unpopular', controversial = 'controversial' };

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private http: HttpClient) { }

  getIdeas(ideaType: string, page: number): Observable<ContentResponse<Idea>> {
    if (Object.values(IdeasType).includes(ideaType as IdeasType)) {
      console.log(ideaType);
      const params = new HttpParams().set('page', page.toString());
      const url = environment.idea.idea + '/' + ideaType;
      return this.http.get<ContentResponse<Idea>>(url, {params}).pipe(
        catchError(this.handleError)
      );
    } else {
      return throwError(() => new Error("Invalid category"));
    }
  }

  saveIdea(ideaRequest: IdeaRequest): Observable<any> {
    console.log(ideaRequest);
    const url = environment.idea.idea;
    return this.http.post(url, ideaRequest).pipe(
      catchError(this.handleError)
    );
  }

  commentIdea(commentRequest: CommentRequest) {
    console.log(`This is the comment: ${commentRequest}`);
    const url = environment.idea.comment;
    return this.http.post(url, commentRequest).pipe(catchError(this.handleError));
  }

  //TODO: vedi come fare per gli errori
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
