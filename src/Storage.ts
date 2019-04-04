import Loki from 'lokijs';
import {AsyncSubject, BehaviorSubject, Observable} from "rxjs";
import { Crypto } from "./Crypto";


export class Storage {

    db: Loki;
    keys: Collection<Key>;
    initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    privateKey: BehaviorSubject<Key> = new BehaviorSubject<Key>(null);

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
            }
        }));
    }

    getPrivateKey(): Observable<Key> {
        return this.privateKey.asObservable();
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


}

export enum KeyType {
    PrivateKey
}

export interface Key {
    type: KeyType,
    value: Uint8Array
}
