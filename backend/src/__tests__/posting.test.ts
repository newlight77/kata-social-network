import { createTimelineInMemoryAdapter } from '../infrastructure/timeline';
import { createPostMessage } from '../usecase/timeline-handler';

describe('posting a message to a personal timeline', () => {
    test('should post an valid messsage to personal timeline', async () => {

        // Arrange
        const repository = createTimelineInMemoryAdapter();
        const user = 'Kong'
        const message = 'hello Kong';
        const postAMessage = createPostMessage({repository});

        // Act
        const result = postAMessage({user, message});

        // Assert
        result.subscribe((list: Array<string> | undefined) => {
            expect(list).toStrictEqual([ 'hello Kong' ]);    
        });
    })
});
