import { Address, toNano, Cell } from '@ton/core';
import { SampleJetton } from '../wrappers/SimpleCounter';   
import { NetworkProvider } from '@ton/blueprint';
import { BitString } from '@ton/core';
import fs from 'fs';


export async function run(provider: NetworkProvider) {
    const owner = Address.parse("0QB56RbbrikjhcKVegAfhExt9_RjOeDiyzaN2_IwtLEALhgm");
    const name = "SampleJetton";
    const symbol = "SJTN";
    const decimals = 9;
    const max_supply = 100000000n;
    const sampleJetton = provider.open(await SampleJetton.fromInit(owner, name, symbol, decimals, max_supply));
    // console.log("test", sampleJetton);
    
    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint', 
            amount: 200000n, 
            receiver: Address.parse("0QBnRzN8w7CcLLneIZ48mFjmTxeAUDmIjV_y3upAOolxUojU")
        }
    );    
    console.log("Jetton Data:", await sampleJetton.getGetJettonData());
    console.log("GetWalletAddress:", await sampleJetton.getGetWalletAddress(Address.parse("EQB56RbbrikjhcKVegAfhExt9_RjOeDiyzaN2_IwtLEALv5p")));
     
}
