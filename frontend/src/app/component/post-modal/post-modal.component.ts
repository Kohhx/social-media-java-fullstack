import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent {
  updateFormGroup: FormGroup;

    onSubmit() {
      console.log("Handling registration form submit button.")
    }
  
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  
    closeModal(): void {
      this.cancel.emit();
    }
}
