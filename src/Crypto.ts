import {CryptoUtils} from "loom-js/dist";


export class  Crypto {
    public static generatePrivateKey(): Uint8Array {
        return CryptoUtils.generatePrivateKey();
    }
}
