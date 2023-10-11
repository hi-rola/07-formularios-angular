import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  /* validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({ email });
    return of({
      emailTaken: true,
    }).pipe(delay(2000));
  } */

  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallOnservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });

        if (email === 'rola@gmail.com') {
          subscriber.next({ emailTaken: true });
          subscriber.complete();
          //return;
        }

        subscriber.next(null);
        subscriber.complete();
      }
    ).pipe(delay(2000));

    return httpCallOnservable;
  }

  //TODO: Retorna true en caso de que ya existe el correo
  // en la base de datos
  /* return this.http.get<any []>(
    `htpp//localhost:3000/users?q={email}`
  ).pipe(
    map(resp =>{
      return (resp.length === 0) ? null : {emailTaken: true}
    })
  ) */
}
