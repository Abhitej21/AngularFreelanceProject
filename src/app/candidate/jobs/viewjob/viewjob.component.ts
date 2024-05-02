import { FetchService } from './../services/fetch.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.scss']
})
export class ViewjobComponent {

  @Input() jobCard: any = {
    lifeAt: '',
    description: '',
    package: '',
    rating: '',
    employType: '',
    location: '',
    title: '',

  };

  isViewLoading: boolean = true;
  // jobID : any;
  routeSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,private fetch: FetchService){}

  ngOnInit(){
    // this.activatedRoute.paramMap.pipe(map((params:any) => params.params)).subscribe(param => {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(param => {

        // this.jobID = param.id;
        // const jobDetails = this.fetch.getViewJob(param.id)
        // this.jobCard = jobDetails;

        console.log(param)
        this.fetch.getViewJob(param['id']).subscribe(data => {
          const jobDetails = data['job_details'];
          console.log(data);
          const temp = {
            title: jobDetails.title,
            description: jobDetails.job_description,
            rating: jobDetails.rating,
            location: jobDetails.location,
            employType: jobDetails.employment_type,
            companyLogo: jobDetails.company_logo_url,
            package: jobDetails.package_per_annum,
            lifeAt: jobDetails.life_at_company.description,
            imageLifeAt: jobDetails.life_at_company.image_url,
            skills: jobDetails.skills,
            similarJobs: data['similar_jobs']

          }
          setTimeout(() => {
            this.jobCard = temp
            this.isViewLoading = false;
          },2000)
          
        })
    })
  }

  ngOnDestroy(){
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe()
    }
  }

}
