import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { BusyService } from "../services/busy.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private busyService: BusyService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('https://api.coingecko.com/api/v3/simple/price?'))
            return next.handle(req);

        this.busyService.busy();
        return next.handle(req).pipe(
            delay(1000),
            finalize(() => {
                this.busyService.idle();
                console.log("nakon idle: ", this.busyService.busyRequestCount);
            })
        );
        // console.log(req.url)
        // return next.handle(req);
    }

}