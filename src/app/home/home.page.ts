import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/Task.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChildren('templateList', {read: ElementRef}) 
  templateListRef: QueryList<ElementRef>;
  
  tasks: Array<Task>;
  private formData: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _serviceTasks: TasksService,
    private animationCtrl: AnimationController,
  ) {
    this._serviceTasks.getTasks().subscribe( (res) => {
      this.tasks = res;
    })
  }
  ngAfterViewInit(): void {
    this.initListAnimation();
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

  initListAnimation() {
    const itemRefArray = this.templateListRef.toArray();
    for (let i=0 ; i < this.templateListRef.length; i++) {
      const element = this.templateListRef[i].nativeElement;

      this.animationCtrl.create()
      .addElement(element)
      .duration(1000)
      .delay(i * (1000/3))
      .easing('ease-in-out') 
      .fromTo('transform', 'translateY(50px)', 'translateY(0px)')
      .fromTo('opacity', '0', '1')
      .play();
    }
  }

  trackKeyExtractor(i: number, screen: Template) {
    return screen.id;
  }
}
export interface Template{
  id: number; 
  backgound: string;
}