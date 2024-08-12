import { saveKey } from '@repositories/key.repository';
import crypto from 'crypto';

export function keyGen() {
    const key = crypto.randomBytes(32).toString('hex');
    saveKey(key);
    return key;
};

console.log(keyGen());
