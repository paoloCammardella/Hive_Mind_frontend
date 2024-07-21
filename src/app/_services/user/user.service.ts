import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from './auth-request.type';
import { User } from './user.type';
import { environment } from '../../../environments/environment.development';
import { LikeIdea } from '../../_model/Idea';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserVotes(username: string) {
    const url = environment.user.votes;
    const params = new HttpParams().set('username', username);
    return this.http.get<LikeIdea[]>(url, {params});
  }

  constructor(private http: HttpClient) {}

  signup(signupRequest: User){
    const url = environment.user.signup; 
    console.log(signupRequest);
    return this.http.post(url, signupRequest);
  }

  login(loginRequest: AuthRequest){
    const url = environment.user.auth; 
    return this.http.post<string>(url, loginRequest);
  }

  likeIdea(ideaRequest: LikeIdea){
    const url = environment.user.like;
    return this.http.post(url, ideaRequest);
  }
}
