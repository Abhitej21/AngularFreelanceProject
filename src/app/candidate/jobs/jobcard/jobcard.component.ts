import { Component, Input } from '@angular/core';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.scss']
})
export class JobcardComponent {

  each: Job;

  @Input() job:Job;
  ngOnInit(){
    this.each = this.job;
  }
}
