import { TimelineRepositoryPort } from '../../domain/timeline/timeline-repository-port';
import { Observable, of } from 'rxjs';


export const createTimelineInMemoryRepositoryAdapter = (): TimelineRepositoryPort => {
    const data: Map<string, Array<string>| undefined> = new Map();

    return {
        saveMassage({user, message}: {user: string, message: string}): Observable<Array<string> | undefined> {
            let items = []
            if (message !== '')
                items.push(message);
            
            data.set(user, items);
            return of(items);
        },
        getByUser({user}: {user: string}): Observable<Array<string> | undefined> {
            return of(data.get(user));
        }
    }
}
