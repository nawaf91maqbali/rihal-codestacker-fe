import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

//http intercepter for all api calls
export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  //set the base url if not add in the services
  if(!req.url.startsWith('http')){
    req = req.clone({
      url: `${environment.ApiUrl}${req.url}`
    })
  }

  //you can add other http intercepter here like:
  //-authorization header
  //-content type
  //or anything you want to send with the request

  return next(req);
};
