import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IdeaRequest } from './idea-request.type';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { CommentRequest } from './comment-request.type';
import { ContentResponse, Idea } from '../../_model/Idea';
import { ErrorHandlerService } from '../errorHandler/error-handler.service';

enum IdeasType { popular = 'popular', unpopular = 'unpopular', controversial = 'controversial' };

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private http: HttpClient) { }
errorHandler = inject(ErrorHandlerService);

  getIdeas(ideaType: string, page: number): Observable<ContentResponse<Idea>> {
    if (Object.values(IdeasType).includes(ideaType as IdeasType)) {
      console.log(ideaType);
      const params = new HttpParams().set('page', page.toString());
      const url = environment.idea.idea + '/' + ideaType;
      return this.http.get<ContentResponse<Idea>>(url, {params}).pipe(
        catchError( this.errorHandler.handleError)
      );
    } else {
      return throwError(() => new Error("Invalid category"));
    }
  }

  saveIdea(ideaRequest: IdeaRequest): Observable<any> {
    console.log(ideaRequest);
    const url = environment.idea.idea;
    return this.http.post(url, ideaRequest).pipe(
      catchError( this.errorHandler.handleError)
    );
  }

  commentIdea(commentRequest: CommentRequest) {
    console.log(`This is the comment: ${JSON.stringify(commentRequest)}`);
    const url = environment.idea.comment;
    return this.http.post(url, commentRequest).pipe(
      catchError( this.errorHandler.handleError)
    );}

  getComments(idea_id: string, commentRange: number): Observable<CommentRequest[]> {
    const url = environment.idea.comment;
    const params = new HttpParams().set('idea_id', idea_id).set('commentRange', commentRange);
    return this.http.get<CommentRequest[]>(url, {params}).pipe(
      catchError( this.errorHandler.handleError)
    );
  }


  //TODO: vedi come fare per gli errori

}
