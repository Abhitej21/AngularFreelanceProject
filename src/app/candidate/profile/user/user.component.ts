import { FetchService } from './../services/fetch.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  flag : boolean = true;

  profileForm: any;
  availableSkills = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'HTML/CSS', 'Ruby', 'PHP', 'Go'];
  profileUser: string | null = 'aa'
  disabled: boolean = false
  constructor(private fb: FormBuilder,private activeRoute: ActivatedRoute
    ,private http: HttpClient,
    private fetch: FetchService){
      this.profileForm = this.fb.group({
        username: [this.profileUser,Validators.required],
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]],
        dob: ['',Validators.required],
        location: ['',Validators.required],
        phone: ['',Validators.required],
        company: ['',Validators.required],
        bio: ['',Validators.required],
        about: ['',[Validators.required,Validators.maxLength(300)]],
        skills: this.fb.array([]),
        github: ['',Validators.required],
        linkedin: ['',Validators.required],
      })
    }
  ngOnInit(): void{
    this.profileForm.valueChanges.subscribe((data:any) => {
      // console.log(this.profileForm.touched)
      console.log(this.profileForm)
    })

    const params = this.activeRoute.paramMap.subscribe((params) => {
      // console.log(data.get('id'))
      this.profileUser = params.get('id')
      console.log(this.profileUser)
      if(this.profileUser !== null){
        this.disabled = true;
        let token = localStorage.getItem('cur_token')
        if(token){
            token = JSON.parse(token)
            console.log(token)
            const headers = new HttpHeaders({
              'authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
              'username': this.profileUser,
            }) 
  
            const url = 'http://localhost:8000/profile/'
            const obs$ = this.http.get(url+this.profileUser,{headers})
            obs$.pipe(map((data:any) => data.data)).subscribe((data) => {
              let date = data.dob.split('T')[0]
                  this.profileForm.patchValue({
                    username: this.profileUser,
                    firstname: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    dob: date,
                    phone: data.phone,
                    location: data.location,
                    company: data.org,
                    bio: data.userBio,
                    about: data.userAbout,
                    github: data.github,
                    linkedin: data.linkedin,
                  })
                  data.userSkills.forEach((skill) => {
                    this.profileForm.value.skills.push(skill);
                  });
             })
        }

        }
      }
    )
    // console.log(params)
    this.profileForm.valueChanges.subscribe((data:any) => {
      // console.log(data)
      console.log(this.profileForm.get('skills').value as FormArray)
    })
  }
  
  addSkill(skill: string): void{
    const skillsArray = this.profileForm?.get('skills') as FormArray;
    skillsArray.push(this.fb.control(skill))
  }

  removeSkill(index: number){
    this.profileForm.value.skills.splice(index,1)
  }

  onSubmit(): void{
    if(this.profileForm?.valid){
      console.log("Form is valid",this.profileForm.value)
      const curProfile = this.profileForm.value
      const postObj = {
        username: curProfile.username,
        firstname: curProfile.firstname,
        lastname: curProfile.lastname,
        org: curProfile.company,
        email: curProfile.email,
        userSkills: curProfile.skills,
        userBio: curProfile.bio,
        dob: curProfile.dob,
        location: curProfile.location,
        phone: curProfile.phone,
        userAbout: curProfile.about,
        github: curProfile.github,
        linkedin: curProfile.linkedin,
      }

      const cur_user = this.profileForm.value.username
      this.fetch.postProfile(cur_user,postObj).subscribe((res)=>{
        console.log(res)
        if(res['message']){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Profile Updated Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      
    }
    else{
      console.log("Form is not valid")
    }
  }
}
