import { CanActivateFn } from '@angular/router';

export const routeGuard: CanActivateFn = (route, state) => {
  //implment your guard here to protected the unauthorized users from navigate through your app
  
  return true;
};
