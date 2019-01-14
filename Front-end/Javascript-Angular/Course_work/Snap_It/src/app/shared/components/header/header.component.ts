
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { IAuthService } from '../../../core/contracts/auth-servise-interface';
import { ToasterModule } from 'angular2-toaster';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( @Inject('IAuthService') private authService: IAuthService, private router: Router) {
  }

  ngOnInit() {
  }
  onLogout() {
    this.authService.signOut();
  }

  get isUserLoggedIn(): boolean {
    return this.authService.authenticated;
  }
  get userID(): string {
    return this.authService.currentUserId;
  }

  toProfile() {
    // this.router.navigate(['/profile/', this.userID]);
    this.router.navigate([`/profile/${this.userID}`]);
    console.log(this.userID);

  }

}
