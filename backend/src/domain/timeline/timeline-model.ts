type User = {
    name: string
}

type Timeline = {
    user: User,
    messages: Array<string>
}

function createUser({name}: {name: string}) {
    return {name} as User;
}

function createTimeline({ username, messages }: { username: string, messages: string[] }): Timeline {
    return { user: createUser({name: username}), messages } as Timeline;
}

function of({ user, messages }: { user: User, messages: string[] }) {
    return { user, messages } as Timeline;
}

function postMessage({text, timeline}: {text: string, timeline: Timeline}): Timeline {
    if (!text || text.length == 0) {
        throw new InvalidArgumentException('The arguement is invalid. It can not be null or blank');
    }
    timeline.messages.push(text);
    return timeline;
}

class InvalidArgumentException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidArgumentException';
    }
}

export {
    User,
    Timeline,
    createUser,
    createTimeline,
    of,
    postMessage,
    InvalidArgumentException
};
