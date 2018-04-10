import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs/symbol/observable';
import { Task } from '../../models/task';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  private domain = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(`${this.domain}api/tasks`)
      .map(res => res);
  }
  addTask(newTask: Task) {
    return this.http.post<Task>(`${this.domain}api/tasks`, newTask)
      .map(res => res);
  }
  deleteTask(id) {
    return this.http.delete<any>(`${this.domain}api/tasks/${id}`)
      .map(res => res);
  }
  updateTask(newTask) {
    return this.http.put<Task>(`${this.domain}api/tasks/${newTask._id}`, newTask)
      .map(res => res);
  }
}
