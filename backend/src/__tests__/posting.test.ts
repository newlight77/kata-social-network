import { InvalidArgumentException, Timeline } from '../domain/timeline';
import { createTimelineInMemoryRepositoryAdapter } from '../infrastructure/timeline';
import { createPostMessage } from '../usecase/post-message';

describe('posting a message to a timeline', () => {
    test('should post a valid messsage to personal timeline', async () => {

        // Arrange
        const repository = createTimelineInMemoryRepositoryAdapter();
        const postAMessage = createPostMessage({repository});
        const username = 'Kong';
        const message = 'hello Kong';

        // Act
        const result = postAMessage({username, message});

        // Assert
        result.subscribe((timeline: Timeline) => {
            expect(timeline.messages).toStrictEqual([ 'hello Kong' ]);    
        });
    })

    test('should not post an empty message as invalid to personal timeline', async () => {

        // Arrange
        const repository = createTimelineInMemoryRepositoryAdapter();
        const postAMessage = createPostMessage({repository});
        const username = 'Kong';
        const message = '';


        try {
            // Act
            postAMessage({username, message});
        } catch (error) {
            // Assert
            expect(error).toBeInstanceOf(InvalidArgumentException);
            expect(error).toHaveProperty('message', 'The arguement is invalid. It can not be null or blank');
        }

        // Act
        // const t = () => postAMessage({username, message});
        // expect(postAMessage({username, message})).toThrow(InvalidArgumentException);
    })

    test('should post a message to another user timeline', async () => {

        // Arrange
        const repository = createTimelineInMemoryRepositoryAdapter();
        const postAMessage = createPostMessage({repository});
        const result1 = postAMessage({username: 'King', message: 'first message'});
        result1.subscribe((timeline: Timeline) => {
            expect(timeline.messages).toStrictEqual([ 'first message' ]);    
        });

        const username = 'Kong';
        const message = 'second message';

        // Act
        const result = postAMessage({username: username, message});

        // Assert
        result.subscribe((timeline: Timeline) => {
            expect(timeline.messages).toStrictEqual([ 'second message' ]);    
        });

        repository.getByUsername({username:'King'}).subscribe((timeline: Timeline) => {
            expect(timeline.messages).toStrictEqual(['first message']);   
        })
        repository.getByUsername({username:'Kong'}).subscribe((timeline: Timeline) => {
            expect(timeline.messages).toStrictEqual(['second message']);   
        })
    })
});
