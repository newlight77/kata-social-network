import { Timeline, postMessage } from '../domain/timeline';
import { TimelineRepositoryPort } from '../domain/timeline/timeline-repository-port';
import { Observable, map } from 'rxjs';

export const createPostMessage = ({repository}: {repository: TimelineRepositoryPort}) =>
    ({username, message}: {username: string, message: string}): Observable<Timeline> => {
        return repository.getByUsername({ username })
        .pipe(map((timeline: Timeline) => {
            const editedTimeline: Timeline = postMessage({ text: message, timeline });
            repository.saveMassage(editedTimeline);
            return editedTimeline;
        }));
    }
