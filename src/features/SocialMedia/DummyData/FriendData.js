

export const friendsList = [
    {
        id: '1',
        name: 'Alice',
        status: 'Active 12m ago',
        messages: [
            { id: 'm1', text: 'Hey, how are you?', timestamp: '5m', isMe: false },
            // ... more messages for Alice
        ],
    },
    {
        id: '2',
        name: 'Bob',
        messages: [
            { id: 'm2', text: 'See you soon!', timestamp: '1h', isMe: true },
            // ... more messages for Bob
        ],
        // ... more friends
    },
];

