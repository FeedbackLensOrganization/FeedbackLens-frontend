import { Component } from '@angular/core';
import { ApiService } from '../../config/api-service';
import { Feedback } from './model/feedback-module';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

   feedbacks: Feedback[] = [];
   constructor(private apiService :ApiService){
   apiService.getFeedbacks().subscribe(res => {
    console.log(res);
      this.feedbacks = res;
    });
   }
}
