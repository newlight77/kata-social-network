import { TimelineRepositoryPort } from '../domain/timeline/timeline-repository-port';

export const createPostMessage = ({repository}: {repository: TimelineRepositoryPort}) =>
    ({user, message}: {user: string, message: string}) => 
            repository.saveMassage({user, message});
