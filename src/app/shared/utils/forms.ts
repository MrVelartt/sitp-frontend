import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

/** Función estatica que recibe por parametro el formulario al cual se le aplicaran las validaciones*/
export const touchControlsForm = (form: FormGroup): void => {
  Object.keys(form.controls).forEach((k) => {
    form.get(k)?.markAsTouched();
    form.get(k)?.markAsDirty();
    form.get(k)?.markAsPristine();
    form.get(k)?.updateValueAndValidity({ emitEvent: true });
  });
};

/** Función estatica que recibe por parametro el control al cual se le aplicaran las validaciones */
export const touchControl = (control: FormControl): void => {
  control.markAsTouched();
  control.markAsDirty();
  control.markAsPristine();
  control.updateValueAndValidity();
};

/**
 * Función que convierte un AbstractControl a FormControl
 * @param abstractControl Elemento de formulario
 * @returns Devuelvel un FormControl del elemento en el parámetro
 */
export const toFormControl = (
  abstractControl: AbstractControl | null | undefined,
): FormControl => {
  return abstractControl as FormControl;
};

/**
 * Función que convierte un AbstractControl a FormGroup
 * @param abstractControl Elemento de formulario
 * @returns Devuelvel un FormGroup del elemento en el parámetro
 */
export const toFormGroup = (
  abstractControl: AbstractControl | null | undefined,
): FormGroup => {
  return abstractControl as FormGroup;
};
