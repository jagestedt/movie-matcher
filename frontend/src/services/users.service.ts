import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { compileNgModule } from '@angular/compiler';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}
    url = environment.apiUrl;
    accessToken = localStorage.getItem('accessToken');
    authHeader = `Bearer ${this.accessToken}`;
    contentType = 'application/json';

    getFetchData(headers) {
        const fetchData = {
            headers: new HttpHeaders(headers),
        };
        return fetchData;
    }

    getUsers(): Observable<any> {
        const fetchData = this.getFetchData({ Authorization: this.authHeader });
        return this.http.get(`${this.url}/users`, fetchData);
    }

    getFriendRequests(): Observable<any> {
        const fetchData = this.getFetchData({ Authorization: this.authHeader });
        return this.http.get(`${this.url}/friendRequests`, fetchData);
    }

    getFriendList(): Observable<any> {
        const fetchData = this.getFetchData({ Authorization: this.authHeader });
        return this.http.get(`${this.url}/friendlist`, fetchData);
    }

    sendFriendRequest(id) {
        const fetchData = this.getFetchData({
            Authorization: this.authHeader,
            'Content-Type': this.contentType,
        });
        const request = this.http.post(
            `${this.url}/addfriend/${id}`,
            fetchData
        );
        request.subscribe((message) => message);
    }

    acceptFriendRequest(id) {
        const fetchData = this.getFetchData({
            Authorization: this.authHeader,
            'Content-Type': this.contentType,
        });
        const request = this.http.put(
            `${this.url}/acceptfriendrequest/${id}`,
            fetchData
        );
        request.subscribe((message) => message);
    }

    deleteRequest(id) {
        const fetchData = this.getFetchData({
            Authorization: this.authHeader,
            'Content-Type': this.contentType,
        });
        const request = this.http.delete(
            `${this.url}/deletefriendrequest/${id}`,
            fetchData
        );
        request.subscribe((message) => message);
    }
}
