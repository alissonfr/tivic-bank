import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Security } from 'src/app/utils/security.util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    confirm_password: [null, Validators.required],
    cpf: [null, [Validators.required]],
    birth: [null, [Validators.required]],
  });

  isLoading = false;
  isPasswordEqual = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    this.isLoading = true;
    delete this.form.value.confirm_password;

    this.userService.setUser(this.form.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.login();
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error.mensagem);
      }
    });
  }

  login() {
    this.isLoading = true;

    this.loginService.login(this.form.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        const username = res.user.name.split(' ')[0];
        this.toastr.success(`Seja bem vindo, ${username}!`);
        this.setUser(res.user, res.token);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error.mensagem);
      }
    });
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

  confirmPassword() {
    if (this.form.value.password !== this.form.value.confirm_password) {
      this.isPasswordEqual = false;
    } else {
      this.isPasswordEqual = true;
    }
  }

  verifyFieldIsValid(field: string) {
    return (
      this.form.get(field)?.invalid &&
      this.form.get(field)?.touched &&
      this.form.get(field)?.dirty
    );
  }
}
