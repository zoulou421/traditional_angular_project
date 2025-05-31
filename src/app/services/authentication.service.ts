import { Injectable } from '@angular/core';
import {IAppUser} from '../models/iuser-model';
import {UUID} from 'angular2-uuid';
import {Observable, of, throttle, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users:IAppUser[]=[];
  authenticatedUser:IAppUser|undefined;

  constructor() {
    this.users.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"user2",password:"1234",roles:["USER"]});
    this.users.push({userId:UUID.UUID(),username:"admin",password:"1234",roles:["USER","ADMIN"]});

  }
  public login(username:string, password:string):Observable<IAppUser> {
    let appUser=this.users.find(user => user.username === username);
    if(!appUser) return  throwError(()=>new Error("User not found"));
    if(appUser.password!=password) {
      return  throwError(()=>new Error("Bad credentials"));
    }
    return of(appUser);

  }
  /*public authenticateUser(user:IAppUser) {
    this.authenticatedUser = user;
    localStorage.setItem('user',JSON.stringify({
      username: user.username,roles:user.roles,jwt:"JWT_TOKEN"
    }));
  }*/
  //with asynchronus
  public authenticateUser(user:IAppUser):Observable<boolean> {
    this.authenticatedUser = user;
    localStorage.setItem('authUser',JSON.stringify({
      username: user.username,roles:user.roles,jwt:"JWT_TOKEN"
    }));
    return of(true);
  }
  public hasRole(role:string):boolean {
    return this.authenticatedUser!.roles.includes(role);
  }
  public isAuthenticated() {
    return this.authenticatedUser!=undefined;
  }

  public logout():Observable<boolean> {
    this.authenticatedUser=undefined;
    localStorage.removeItem('authUser');
    return of(true);
  }
}
