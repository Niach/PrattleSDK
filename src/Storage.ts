import Loki from 'lokijs';
import {AsyncSubject, BehaviorSubject, Observable} from "rxjs";
import { Crypto } from "./Crypto";


export class Storage {

    private db: Loki;
    private keys: Collection<Key>;
    private initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private privateKey: BehaviorSubject<Key> = new BehaviorSubject<Key>(null);
    private userAddress: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor() {
        this.db = new Loki('Prattle', {
            autoload: true,
            autoloadCallback: () => {
                this.init();
            },
            autosave: true,
            autosaveInterval: 1000
        });

        this.initialized.subscribe((value => {
            if(value) {
                this.privateKey.next(this.keys.findOne({type: KeyType.PrivateKey}));
                this.userAddress.next(Crypto.getUserAddress(Crypto.getPublicKey(this.privateKey.value.value)));
            }
        }));
    }

    init() {
        this.keys = this.db.getCollection('keys');
        if(!this.keys) {
            this.keys = this.db.addCollection('keys');
            this.keys.insert({
                type: KeyType.PrivateKey,
                value: Crypto.generatePrivateKey()
            });
        }
        this.initialized.next(true);
    }

    getInitialized(): Observable<boolean> {
        return this.initialized.asObservable();
    }

    getPrivateKey(): Observable<Key> {
        return this.privateKey.asObservable();
    }

    getUserAddress(): Observable<string> {
        return this.userAddress.asObservable();
    }




}

export enum KeyType {
    PrivateKey
}

export interface Key {
    type: KeyType,
    value: Uint8Array
}
