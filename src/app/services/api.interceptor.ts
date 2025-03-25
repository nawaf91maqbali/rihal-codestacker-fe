import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if(!req.url.startsWith('http')){
    req = req.clone({
      url: `${environment.ApiUrl}${req.url}`
    })
  }

  return next(req);
};
