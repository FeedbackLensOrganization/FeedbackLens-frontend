import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../config/api-service';

@Component({
  selector: 'app-feedback',
  imports: [],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  private apiService = inject(ApiService);
  maxLength = 1000;
  feedbackText = signal('');
  isSubmitted = signal(false);
  isLoading = signal(false);

  get charCount() {
    return this.feedbackText().length;
  }
  submitFeedback() {
    if (!this.feedbackText().trim()) return;

    this.isLoading.set(true);
    this.apiService
      .createFeedback({ text: this.feedbackText() }) // brauchst du noch im Service
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.isSubmitted.set(true);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  resetForm() {
    this.feedbackText.set('');
    this.isSubmitted.set(false);
  }
}
