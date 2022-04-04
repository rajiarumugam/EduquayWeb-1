import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
 })
export class uploadSharedService{

    buttonClicked = new Subject();
    private emitChangeSource = new Subject<any>();

    changeEmitted$ = this.emitChangeSource.asObservable();

    getButtonClicked(){
        return this.buttonClicked.asObservable();    
    }

    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}