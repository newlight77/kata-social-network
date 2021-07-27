import { TimelineRepositoryPort } from '../../domain/timeline/timeline-repository-port';
import { Observable, of } from 'rxjs';
import { createTimeline, Timeline } from '../../domain/timeline';


export const createTimelineInMemoryRepositoryAdapter = (): TimelineRepositoryPort => {
    const data: Map<string, Timeline> = new Map();

    return {
        saveMassage(timeline: Timeline): Observable<Timeline> {
            data.set(timeline.user.name, timeline);
            return of(timeline);
        },
        getByUsername({username}: {username: string}): Observable<Timeline> {
            return of(data.get(username) || createTimeline({ username, messages: [] }));
        }
    }
}
