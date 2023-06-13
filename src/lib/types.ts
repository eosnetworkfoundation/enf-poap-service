export interface BaseMetadata {
    name: string;
    description: string;
    imageUrl: string;
}
export interface TokenMetadata extends BaseMetadata {
    creatorAddress: string;
}

export interface Token extends TokenMetadata {
    id: string;
}
