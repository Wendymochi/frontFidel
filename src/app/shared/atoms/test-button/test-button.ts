import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-test-button',
  imports: [ButtonModule],
  template: `
    <p-button label="Hola Wendy"></p-button>
  `
})
export class TestButtonComponent {}
