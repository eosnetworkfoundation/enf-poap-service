export interface TokenMetadata {
    name: string;
    description: string;
    creatorAddress: string;
    imageUrl: string;
}

export interface Token extends TokenMetadata {
    id: string;
}
