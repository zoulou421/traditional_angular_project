import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-template',
  standalone: false,
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit {

    constructor(public authService:AuthenticationService,private router:Router) {
    }
    ngOnInit(): void {
    }

  handLogout(){
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        }
      });
  }
}
