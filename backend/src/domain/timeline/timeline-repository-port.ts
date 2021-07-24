import { Observable } from 'rxjs';

export interface TimelineRepositoryPort {
    saveMassage({user, message}: {user: string, message: string}): Observable<Array<string>| undefined>
    getByUser({user}: {user: string}): Observable<Array<string> | undefined>
}
