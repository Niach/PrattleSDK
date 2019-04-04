import Web3 from "web3";
import {Contract} from "web3-eth-contract/types";

export abstract class BaseContract {
    protected contract: Contract;
    protected web3: Web3;
    protected userAddress: string;



    protected constructor(abi: any, contractAddress: string, web3: Web3, userAddress: string) {
        this.contract = new web3.eth.Contract(abi, contractAddress, {from: userAddress});
        this.web3 = web3;
        this.userAddress = userAddress;
    }

    abstract async init(): Promise<void>;
}
