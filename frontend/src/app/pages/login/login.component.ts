import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly loginService: LoginService,
  ) {}

  onSubmit() {
    this.isLoading = true;

    this.loginService.login(this.form.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        const username = res.user.name.split(' ')[0];
        // this.toastr.success(`Seja bem vindo, ${username}!`);
        this.setUser(res.user, res.token);
      },
      error: (err) => {
        this.isLoading = false;
        // this.toastr.error(err.error.mensagem);
      }
    });
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

  verifyFieldIsValid(field: string) {
    return (
      this.form.get(field)?.invalid &&
      this.form.get(field)?.touched &&
      this.form.get(field)?.dirty
    );
  }
}
