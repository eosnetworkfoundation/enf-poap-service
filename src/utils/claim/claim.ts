import { Contract, ethers } from 'ethers';
import type {
    ExternalProvider,
    JsonRpcSigner,
    TransactionResponse,
} from '@ethersproject/providers';

import { APP_CONFIG } from '../../settings/settings';
import { poapContractAbi } from '../../abi/poapContractAbi';
import type { BaseMetadata } from '../../lib/types';

export const mintToken = async (
    poapInputs: BaseMetadata,
    externalProvider: ExternalProvider
): Promise<TransactionResponse> => {
    try {
        const provider = new ethers.providers.Web3Provider(externalProvider);
        await provider.send('eth_requestAccounts', []);
        const signer: JsonRpcSigner = await provider.getSigner();
        const config = await APP_CONFIG();
        const mintContract = new Contract(config.contractAddress, poapContractAbi, signer);
        const newPOAP: TransactionResponse = await mintContract.create(
            poapInputs.name,
            poapInputs.description,
            poapInputs.imageUrl
        );
        return newPOAP;
    } catch (err) {
        throw new Error(`Failed to mint new POAP: ${err}`);
    }
};
