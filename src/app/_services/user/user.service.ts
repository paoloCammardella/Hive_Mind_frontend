import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthRequest } from './auth-request.type';
import { User } from './user.type';
import { environment } from '../../../environments/environment.development';
import { LikeIdea } from '../../_model/Idea';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from '../errorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

errorHandler = inject(ErrorHandlerService);

  getUserVotes(username: string): Observable<LikeIdea[]> {
    const url = environment.user.votes;
    const params = new HttpParams().set('username', username);
    return this.http.get<LikeIdea[]>(url, {params}).pipe(
      catchError( this.errorHandler.handleError)
    );
  }

  constructor(private http: HttpClient) {}

  signup(signupRequest: User){
    const url = environment.user.signup; 
    console.log(signupRequest);
    return this.http.post(url, signupRequest).pipe(
      catchError( this.errorHandler.handleError)
    );
  }

  login(loginRequest: AuthRequest){
    const url = environment.user.auth; 
    return this.http.post<string>(url, loginRequest).pipe(
      catchError( this.errorHandler.handleError)
    );
  }

  likeIdea(ideaRequest: LikeIdea){
    const url = environment.user.like;
    const username = localStorage.getItem("user") as string;
    const params = new HttpParams().set('username', username);
    return this.http.post(url, ideaRequest, {params}).pipe(
      catchError( this.errorHandler.handleError)
    );
  }
}
