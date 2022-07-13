import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  private storageP: Storage | null = null;


  constructor(private storage: Storage, private http: HttpClient ) {
    this.init();
  }

  async loadToken() {
    const token = await this.storageP.get(TOKEN_KEY);
    if (token) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }

  }

  login(credentials: {email; password} ): Observable<any> {
    return this.http.post(`https://reqres.in/api/login`, credentials).pipe(      
    map((data: any) => data.token),
    switchMap(token => from(this.storageP.set(TOKEN_KEY, token))),
    tap(_ => {
      this.isAuthenticated.next(true);
    })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return this.storageP.remove(TOKEN_KEY);
  }

  async init() {
    const storage = await this.storage.create();
    this.storageP = storage;
    this.loadToken();
  }

  public set(key: string, value: any) {
    this.storageP?.set(key, value);
  }

}
