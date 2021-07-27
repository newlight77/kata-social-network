import { InvalidArgumentException, Timeline, createTimeline } from '../domain/timeline';
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
        const initialTimeline = createTimeline({username: 'King', messages: ['first message']});
        repository.saveMassage(initialTimeline);

        const username = 'Kong';
        const message = 'second message';
        const postAMessage = createPostMessage({repository});

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

    test('should post a message the user non-empty timeline ', async () => {

        // Arrange
        const repository = createTimelineInMemoryRepositoryAdapter();
        const username = 'Kong';
        const initialTimeline = createTimeline({username, messages: ['first message', 'second message']});
        repository.saveMassage(initialTimeline);

        const postAMessage = createPostMessage({repository});
        const message = 'third message';

        // Act
        const result = postAMessage({username: username, message});

        // Assert
        result.subscribe((timeline: Timeline) => {
            expect(timeline.messages).toStrictEqual(['first message', 'second message', 'third message']);    
        });
        repository.getByUsername({username:'Kong'}).subscribe((timeline: Timeline) => {
            expect(timeline.messages).toStrictEqual(['first message', 'second message', 'third message']);   
        })
    })
});
