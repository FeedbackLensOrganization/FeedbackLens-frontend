import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-feedback',
  imports: [],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  maxLength = 1000;
  feedbackText = signal('');

  get charCount() {
    return this.feedbackText().length;
  }
}
