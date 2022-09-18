import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    constructor() { }

    getUserData(){
        return window.localStorage['user_data']
    }
    saveUserData(data:any){
        window.localStorage['user_data'] = data
    }

    getToken(): string {
        return window.localStorage['jwtToken'];
    }

    saveToken(token: string): void {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken(): void {
        window.localStorage.removeItem('jwtToken');
    }
}
