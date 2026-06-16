import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { input } from '@angular/core';
import { Categoria } from '@data/interfaces/categoria.interface';
import { effect } from '@angular/core';

@Component({
  selector: 'app-categoria-form',
  imports: [ReactiveFormsModule, InputTextModule, CheckboxModule, ButtonModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css',
})
export class CategoriaForm {
  private readonly fb = inject(FormBuilder);

  readonly formSubmit = output<{ nombre: string; estado: boolean }>();

  readonly formCancel = output<void>();
  cancel(): void {
    this.formCancel.emit();
  }
  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    estado: [true],
  });
  

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.form.getRawValue());
  }
  resetForm(): void {
    this.form.reset({
      nombre: '',
      estado: true,
    });
  }
  readonly categoria = input<Categoria | null>(null);
  private readonly categoriaEffect = effect(() => {

  const categoria = this.categoria();

  if (!categoria) return;

  this.form.patchValue({
    nombre: categoria.nombre,
    estado: categoria.estado
  });

});


}
