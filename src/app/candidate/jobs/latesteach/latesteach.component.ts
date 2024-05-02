import { Component, Input } from '@angular/core';
import { FreelanceJob } from '../models/freelanceJob.model';

@Component({
  selector: 'app-latesteach',
  templateUrl: './latesteach.component.html',
  styleUrls: ['./latesteach.component.scss']
})
export class LatesteachComponent {

  @Input() job : FreelanceJob;
  constructor(){
  }
  ngOnInit(){
  }

}
