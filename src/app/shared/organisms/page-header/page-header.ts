import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {

  title = input.required<string>();
  description = input<string>('');
  buttonText = input<string>('');

  readonly actionClick = output<void>();

  onActionClick(): void {
    this.actionClick.emit();
  }

}
