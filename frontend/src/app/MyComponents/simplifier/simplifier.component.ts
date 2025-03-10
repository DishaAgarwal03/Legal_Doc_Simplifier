import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimplifierService } from '../../services/clause-simplifier.service';

@Component({
  selector: 'app-simplifier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simplifier.component.html',
  styleUrls: ['./simplifier.component.css']
})
export class SimplifierComponent {
  userInput: string = '';
  isLoading: boolean = false; // Add isLoading state

  @Output() inputSubmitted = new EventEmitter<string>();
  
  constructor(private simplifierService: SimplifierService) {}

  submitText() {
    if (this.userInput.trim()) {
      this.isLoading = true; // Start loader
      this.simplifierService.simplifyText(this.userInput).subscribe(
        (response) => {
          this.inputSubmitted.emit(response.simplified_text);
          this.userInput = ''; // Clear input field after submission
          console.log("Simplified text received:", response.simplified_text);
          this.isLoading = false; // Stop loader
        },
        (error) => {
          console.error("Error in API call:", error);
          this.isLoading = false; // Stop loader on error
        }
      );
    }
  }
}
