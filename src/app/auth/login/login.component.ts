import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements  OnInit {
userFormGroup!:FormGroup;
errorMessage:any;

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService, private router: Router
  ) {}

  ngOnInit(): void {
     this.userFormGroup = this.fb.group({
       username: this.fb.control(''),
       password: this.fb.control(''),
     })
  }

  handleLogin() {
      let username=this.userFormGroup.value.username;
      let password=this.userFormGroup.value.password;
      this.authenticationService.login(username,password).subscribe({
        next: (appUser) => {
          this.authenticationService.authenticateUser(appUser).subscribe({
            next: (data) => {
              this.router.navigateByUrl('/admin/products');
            }
          });
        },
        error: (err) => {
         this.errorMessage = err;
        }
      });

  }
}
