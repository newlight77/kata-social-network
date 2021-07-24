import { createTimelineInMemoryRepositoryAdapter } from '../infrastructure/timeline';
import { createPostMessage } from '../usecase/timeline';

describe('posting a message to a personal timeline', () => {
    test('should post an valid messsage to personal timeline', async () => {

        // Arrange
        const repository = createTimelineInMemoryRepositoryAdapter();
        const user = 'Kong';
        const message = 'hello Kong';
        const postAMessage = createPostMessage({repository});

        // Act
        const result = postAMessage({user, message});

        // Assert
        result.subscribe((list: Array<string> | undefined) => {
            expect(list).toStrictEqual([ 'hello Kong' ]);    
        });
    })

    test('should not post an empty message as invalid to personal timeline', async () => {

        // Arrange
        const repository = createTimelineInMemoryRepositoryAdapter();
        const user = 'Kong';
        const message = '';
        const postAMessage = createPostMessage({repository});

        // Act
        const result = postAMessage({user, message});

        // Assert
        result.subscribe((list: Array<string> | undefined) => {
            expect(list).toStrictEqual([]);    
        });
    })

    test('should post message to an isolated user timeline', async () => {

        // Arrange
        const repository = createTimelineInMemoryRepositoryAdapter();
        const postAMessage = createPostMessage({repository});

        // Act
        postAMessage({user:'King', message: 'message 1'});
        postAMessage({user:'Kong', message: 'message 2'});

        // Assert
        repository.getByUser({user:'King'}).subscribe((list: Array<string> | undefined) => {
            expect(list).toStrictEqual(['message 1']);   
        })
        repository.getByUser({user:'Kong'}).subscribe((list: Array<string> | undefined) => {
            expect(list).toStrictEqual(['message 2']);   
        })
    })
});
