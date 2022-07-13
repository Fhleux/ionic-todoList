import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl= 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.baseUrl}tasks`);
  }

  newTask(task: Task) {
    return this.http.post(`${this.baseUrl}tasks`, task);
  }

  editTask(task: Task, id:string) {
    return this.http.patch(`${this.baseUrl}tasks/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}tasks/${id}`);
  }

  getTaskById(id:string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}tasks/${id}`);
  }
  
}
