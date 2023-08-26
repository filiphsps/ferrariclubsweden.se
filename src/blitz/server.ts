import { setupBlitzServer } from '@blitzjs/next';

const { api } = setupBlitzServer({
    plugins: [
        // plugins will go here
    ]
});

export { api };
