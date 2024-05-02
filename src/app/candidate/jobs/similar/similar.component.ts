import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss']
})
export class SimilarComponent {
  @Input() eachElement: any;

  ngOnInit(){
    console.log(this.eachElement);
  }

}
