import { TimelinePort } from '../../domain/timeline/timeline';
import { Observable, of } from 'rxjs';


export const createTimelineInMemoryAdapter = (): TimelinePort => {
    const data: Map<string, Array<string>| undefined> = new Map();

    return {
        saveMassage({user, message}: {user: string, message: string}): Observable<Array<string> | undefined> {
            let items = []
            if (message !== '')
                items.push(message);
            
            data.set(user, items);
            return of(items);
        }
    }
}
