import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.js'; 

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getById(id: number) {
  return this.http.get<Post>(`${this.url}/${id}`);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  create(post: Post) {
  return this.http.post<Post>(this.url, post);
  }

  update(id: number, post: Post) {
  return this.http.put<Post>(`${this.url}/${id}`, post);
  }

}
