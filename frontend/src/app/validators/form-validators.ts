import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidators {

  // whitespace validation
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors {

    // check if string only contains whitespace:
    if ((control.value != null) && (control.value.trim().length === 0)) {
      return { 'notOnlyWhiteSpace': true };
    } else {
      // valid - return empty object
      return {};
    }
  }

  static checkGender(control: FormControl): ValidationErrors {

    // Check if value is either "male" or "female"
    if ((control.value !== "male") && (control.value !=="female")) {
      return { 'gender': true };
    } else {
      // valid - return empty object
      return {};
    }
  }

}
