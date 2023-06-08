import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';

// add any env vars needed in client here for use
export const APP_CONFIG = async () => {
    return {
        contractAddress: PUBLIC_CONTRACT_ADDRESS,
    };
};
