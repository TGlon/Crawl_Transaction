import { Address, toNano, Cell } from '@ton/core';
import { SampleJetton } from '../wrappers/SimpleCounter';   
import { NetworkProvider } from '@ton/blueprint';
// import { BitString } from '@ton/core';
// import fs from 'fs';
import { buildOnchainMetadata } from '../utils/jetton-helper';

export async function run(provider: NetworkProvider) {
    const owner = Address.parse("0QB56RbbrikjhcKVegAfhExt9_RjOeDiyzaN2_IwtLEALhgm");
    const jettonParams = {
        name: "Along",
        description: "This is description of Test Jetton Token in Tact-lang",
        symbol: "AL",
        image: "https://i.pinimg.com/474x/30/ce/6f/30ce6fac371d5eb753d70241af0884b0.jpg",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);
    const max_supply = 10000000000000000000000n;
    const sampleJetton = provider.open(await SampleJetton.fromInit(owner, content, max_supply));
    // console.log("test", sampleJetton);
    
    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint', 
            amount: 2000000000000n, 
            receiver: Address.parse("0QB56RbbrikjhcKVegAfhExt9_RjOeDiyzaN2_IwtLEALhgm")
        }
    );   
    await provider.waitForDeploy(sampleJetton.address); 
    // console.log("Token Address:", sampleJetton.address);
     
    console.log("Jetton Data:", await sampleJetton.getGetJettonData());
    // console.log("GetWalletAddress:", await sampleJetton.getGetWalletAddress(Address.parse("0QBnRzN8w7CcLLneIZ48mFjmTxeAUDmIjV_y3upAOolxUojU")));
     
}
