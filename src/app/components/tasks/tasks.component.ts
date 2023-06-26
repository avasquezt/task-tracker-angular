import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks: Task[] = [];
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private taskService: TaskService,
              private uiService: UiService,
    ){
      this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
    }

  ngOnInit(): void {
      this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe(
      () => this.tasks = this.tasks.filter(t => t.id != task.id)
    );
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask($event: any){
    this.taskService.addTask($event).subscribe((task) => this.tasks.push(task));
  }
}
