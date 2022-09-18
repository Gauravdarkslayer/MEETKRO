import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private apiService: ApiService
    ) {
    }
    loginUser(data: any): Observable<any> {
        return this.apiService.post('/api/v1/admin/login', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    logout(data: any): Observable<any> {
        return this.apiService.get('/api/v1/admin/logout', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }

    forgotPassword(data: any): Observable<any> {
        return this.apiService.post('/api/v1/admin/forgotPassword', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    

    resetPassword(data: any): Observable<any> {
        return this.apiService.post('/api/v1/admin/resetPassword', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
  
    getUsers(data: any): Observable<any> {
        return this.apiService.post('/api/v1/user/users-by-paginate', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    addUser(data: any): Observable<any> {
        return this.apiService.post('/api/v1/admin/addUser', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    editUser(data: any): Observable<any> {
        return this.apiService.get('/api/v1/admin/editUser', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    updateUser(data: any): Observable<any> {
        return this.apiService.post('/api/v1/admin/updateUser', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    deleteUser(data: any): Observable<any> {
        return this.apiService.delete('/api/v1/admin/deleteUser', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    getContactUs(data: any): Observable<any> {
        return this.apiService.post('/api/v1/admin/getContactUs', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
   

    getSlots(data:any):Observable<any> {
        return this.apiService.post('/api/v1/admin/slots-by-paginate', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }

    getMeetings(data:any):Observable<any> {
        return this.apiService.post('/api/v1/admin/meetings-by-paginate', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }

    createSlot(data: any): Observable<any> {
        return this.apiService.post('/api/v1/admin/create-slot', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }


    addBlogCategories(data:any): Observable<any> {
        return this.apiService.post('/api/v1/admin/addBlogCategory', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    updateBlogCategories(data:any): Observable<any> {
        return this.apiService.post('/api/v1/admin/updateBlogCategory', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    editBlogCategories(data:any): Observable<any> {
        return this.apiService.get('/api/v1/admin/editBlogCategory', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    deleteBlogCategories(data:any): Observable<any> {
        return this.apiService.delete('/api/v1/admin/deleteBlogCategory', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }

    getBlogsCategories(data:any): Observable<any> {
        return this.apiService.post('/api/v1/admin/allBlogCategories', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }

    getBlogs(data:any): Observable<any> {
        return this.apiService.post('/api/v1/admin/content-by-paginate', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }

    deleteBlog(data:any): Observable<any> {
        return this.apiService.delete('/api/v1/admin/deleteBlog', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }

    addBlog(data:any): Observable<any> {
        return this.apiService.post('/api/v1/admin/createContent', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    editBlog(data:any): Observable<any> {
        return this.apiService.get('/api/v1/admin/content-by-id', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }
    updateBlog(data:any): Observable<any> {
        return this.apiService.post('/api/v1/admin/updateContent', data)
            .pipe(map(
                res => {
                    return res;
                }
            ));
    }

    
}
