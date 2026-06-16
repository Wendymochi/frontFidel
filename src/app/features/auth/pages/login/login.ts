import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthRepository } from '@data/interfaces/auth.repository';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private readonly fb = inject(FormBuilder);
private readonly authRepository = inject(AuthRepository);
  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login(): void {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const dto = this.form.getRawValue();

  this.authRepository
    .login(dto)
    .subscribe({
      next: (response) => {

  localStorage.setItem(
    'access_token',
    response.access_token
  );

  console.log('TOKEN GUARDADO');

},
      error: (error) => {

        console.error('LOGIN ERROR');
        console.error(error);

      }
    });

}

}