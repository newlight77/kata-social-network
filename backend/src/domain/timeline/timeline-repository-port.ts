import { Observable } from 'rxjs';
import { Timeline } from '../../domain/timeline';

export interface TimelineRepositoryPort {
    saveMassage(timeline: Timeline): Observable<Timeline>
    getByUsername({username}: {username: string}): Observable<Timeline>
}
