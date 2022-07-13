import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from '../../models/Task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  private detailsForm: FormGroup;
  private id: string;

  constructor(
    private _activated: ActivatedRoute,
    private _serviceTasks: TasksService,
    private router: Router,
  ) {
    this.id = this._activated.snapshot.paramMap.get('id');
    this.detailsForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    });
  }

  ngOnInit() {
    this._serviceTasks.getTaskById(this.id).subscribe((res) => {
      this.detailsForm = new FormGroup({
        title: new FormControl(res.title),
        description: new FormControl(res.description)
      });
    });
  }

  saveChanges() {
    this._serviceTasks.editTask(this.detailsForm.value, this.id)
      .subscribe((res) => {
        this.router.navigateByUrl('/home', {replaceUrl:true});
    })
  }

  deleteTask() {
    this._serviceTasks.deleteTask(this.id).subscribe(
      (res) => {
        this.router.navigateByUrl('/home', {replaceUrl:true});
      }
    );
  }

}
