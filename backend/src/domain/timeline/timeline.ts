import { Observable } from 'rxjs';

export interface TimelinePort {
    saveMassage({message}: {message: string}): Observable<Array<string>| undefined>
}
