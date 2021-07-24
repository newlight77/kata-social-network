import { TimelinePort } from '../domain/timeline/timeline';
import { createTimelineInMemoryAdapter } from '../infrastructure/timeline/timeline-inmemory-adapter';

const inMemomyTimelineRepository = createTimelineInMemoryAdapter();

export const createPostMessage = ({repository = inMemomyTimelineRepository}: {repository: TimelinePort}) =>
    ({user, message}: {user: string, message: string}) => 
            repository.saveMassage({message});
