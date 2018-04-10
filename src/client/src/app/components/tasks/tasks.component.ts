import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/tasks/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  task: Task;

  idDone: boolean;


  constructor(private taskService: TaskService) {
    this.task = new Task();
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
   }

  ngOnInit() {
  }


  addTask(taskForm) {
    this.taskService.addTask(this.task)
      .subscribe(task => {
        this.tasks.push(task);
        this.task.title = '';
      });
  }

  deleteTask(id) {
    console.log(id);
    // this.tasks = tasks;
    const answer = confirm('are you sure to delete it?');
    if (answer) {
      this.taskService.deleteTask(id)
      .subscribe( data => {
        console.log(data);
          if (data.deletedCount === 1) {
            this.taskService.getTasks()
            .subscribe(tasks => {
              this.tasks = tasks;
            });
         }
      });
    }
    return;
  }
  updateStatus(taskForm: Task) {
    const newTask = {
      _id: taskForm._id,
      title: taskForm.title,
      isDone: !taskForm.isDone
    };
    this.taskService.updateTask(newTask)
      .subscribe(res => {
        taskForm.isDone = !taskForm.isDone;
      });
  }

}
