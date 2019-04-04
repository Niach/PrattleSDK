import Web3 from "web3";
import { Storage } from "./Storage";

import {PrattleNetwork} from "./contracts/PrattleNetwork";


export class PrattleSDK {
    mainContract: PrattleNetwork;
    public storage: Storage = new Storage();
    constructor(private web3: Web3, private mainContractAddress: string) {

    }

    public async init() {

    }
}

