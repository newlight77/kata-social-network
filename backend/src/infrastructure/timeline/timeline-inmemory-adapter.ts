import { TimelinePort } from '../../domain/timeline/timeline';
import { Observable, of } from 'rxjs';


export const createTimelineInMemoryAdapter = (): TimelinePort => {
    const data: Map<string, Array<string>| undefined> = new Map();

    return {
        saveMassage({user, message}: {user: string, message: string}): Observable<Array<string> | undefined> {
            data.set(user, [message]);
            return of(data.get(user));
        }
    }
}
