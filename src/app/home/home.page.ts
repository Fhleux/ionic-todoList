import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/Task.model';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  tasks: Array<Task>;
  private formData: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _serviceTasks: TasksService,
  ) {
    this._serviceTasks.getTasks().subscribe( (res) => {
      this.tasks = res;
    })
  }

  ngOnInit() {
    this.formData = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  addTaskOnSubmit() {
    this._serviceTasks.newTask(this.formData.value)
      .subscribe((res) => {
        return res;
    });
    this._serviceTasks.getTasks().subscribe( (res) => {
      this.tasks = res;
    })
    this.formData = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    });

  }

}
