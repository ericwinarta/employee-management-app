import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usernameFc: FormControl;
  passwordFc: FormControl;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {
    this.usernameFc = new FormControl('');
    this.passwordFc = new FormControl('');
  }

  ngOnInit(): void {
  }

  submitLogin() {
    if (this.authSvc.login(this.usernameFc.value, this.passwordFc.value)) {
      this.router.navigate(['/employee']);
    } else {
      alert('Username or password not exist');
    }
  }
}
