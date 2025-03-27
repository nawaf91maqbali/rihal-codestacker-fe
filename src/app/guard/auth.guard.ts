import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
//implment your guard here to protected the unauthorized users from navigate through your app

  return true;
};
