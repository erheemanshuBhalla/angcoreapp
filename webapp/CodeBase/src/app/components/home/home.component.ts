import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userDetails: any;
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
