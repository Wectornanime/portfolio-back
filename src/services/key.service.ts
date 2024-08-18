import crypto from 'crypto';

import { saveKey } from '@repositories/key.repository';

export function keyGen() {
  const key = crypto.randomBytes(32).toString('hex');
  saveKey(key);
  return key;
}

console.log(keyGen());
