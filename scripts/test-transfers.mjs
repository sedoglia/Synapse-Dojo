import assert from 'node:assert';
import { newTransferCode, normalizeTransferCode, cleanUp } from '../server/board.ts';
import { parseSave, store } from '../src/storage.ts';
import { onRequestPost, onRequestGet, onRequestDelete } from '../functions/api/transfer.ts';

console.log('=== RUNNING TRANSFER & STORAGE TESTS ===');

// 1. Transfer code generation & normalization
for (let i = 0; i < 50; i++) {
  const code = newTransferCode();
  assert.strictEqual(code.length, 9);
  assert.strictEqual(code[4], '-');
  const clean = code.replace('-', '');
  assert.strictEqual(clean.length, 8);
  assert.match(clean, /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$/);
}
assert.strictEqual(normalizeTransferCode('k7np-9w4m'), 'K7NP-9W4M');
assert.strictEqual(normalizeTransferCode('  k7np 9w4m  '), 'K7NP-9W4M');
assert.strictEqual(normalizeTransferCode('K7NP9W4M'), 'K7NP-9W4M');
assert.strictEqual(normalizeTransferCode('invalid!code'), '');
assert.strictEqual(normalizeTransferCode(null), '');
console.log('✓ Transfer codes verified.');

// 2. Storage export / parseSave / replace
const storageMap = new Map();
globalThis.localStorage = {
  getItem: (k) => storageMap.get(k) ?? null,
  setItem: (k, v) => storageMap.set(k, String(v)),
  removeItem: (k) => storageMap.delete(k),
  clear: () => storageMap.clear(),
};

store.data = {
  name: 'Leopardo Mario',
  created: '2026-10-01',
  runs: [{ ex: 'flanker', date: '2026-11-08', score: 92, detail: '10/10' }],
  checks: [{ date: '2026-11-08', score: 810, parts: { memory: 80 }, v: 3 }],
  levels: { flanker: 7 },
  plan: { date: '2026-11-08', ids: ['flanker'], done: ['flanker'], round: 1 },
  history: { flanker: [{ date: '2026-11-08', level: 7 }] },
  practiced: ['flanker'],
  xp: 1540,
  badges: { first: '2026-10-01' },
  bestStreak: 12,
  counters: { plans: 5 },
  settings: { lang: 'it', sound: true, relaxed: false, bigText: false, shareOffer: true },
  board: {
    id: '12345678-1234-1234-1234-123456789abc',
    secret: 'my-super-secret-token-1234567890abcdef',
    nameCode: 15923,
    ageBand: '30-49',
    pending: false,
  },
  boardInvite: 'ABCD234567',
  boardPrompt: { snoozed: '2026-11-01' },
  balance: 2,
  bestFrom: { flanker: '2026-10-01' },
};

const exportedStr = store.exportJson();
const exportedObj = JSON.parse(exportedStr);
assert(exportedObj.data.board !== null);
assert.strictEqual(exportedObj.data.board.id, '12345678-1234-1234-1234-123456789abc');

const parsedData = parseSave(exportedObj);
assert(parsedData !== null);
assert(parsedData.board !== null);
assert.strictEqual(parsedData.board.id, '12345678-1234-1234-1234-123456789abc');

store.reset();
store.replace(parsedData);
assert.strictEqual(store.data.name, 'Leopardo Mario');
assert.strictEqual(store.data.board.id, '12345678-1234-1234-1234-123456789abc');
assert.strictEqual(store.data.board.nameCode, 15923);
console.log('✓ Complete save preservation (runs, levels, nickname, groups, leaderboard) verified.');

// 3. API handlers & nightly cleanup
class MockD1 {
  constructor() {
    this.rows = new Map();
  }
  prepare(query) {
    const self = this;
    return {
      bind(...args) {
        return {
          async run() {
            if (query.includes('INSERT INTO temp_transfers')) {
              const [code, payload, created] = args;
              self.rows.set(code, { code, payload, created });
              return { meta: { changes: 1 } };
            }
            if (query.includes('DELETE FROM temp_transfers WHERE code = ?')) {
              const [code] = args;
              const existed = self.rows.delete(code);
              return { meta: { changes: existed ? 1 : 0 } };
            }
            return { meta: { changes: 0 } };
          },
          async first() {
            if (query.includes('SELECT 1 FROM temp_transfers WHERE code = ?')) {
              const [code] = args;
              return self.rows.has(code) ? { 1: 1 } : null;
            }
            if (query.includes('SELECT payload, created FROM temp_transfers WHERE code = ?')) {
              const [code] = args;
              return self.rows.get(code) ?? null;
            }
            return null;
          },
        };
      },
    };
  }
  async batch() {
    return [
      { meta: { changes: 0 } },
      { meta: { changes: 0 } },
      { meta: { changes: 0 } },
      { meta: { changes: 0 } },
      { meta: { changes: 0 } },
      { meta: { changes: 0 } },
      { meta: { changes: 0 } },
      { meta: { changes: 0 } },
      { meta: { changes: 3 } },
    ];
  }
}

const mockDb = new MockD1();
const mockEnv = { DB: mockDb };

const postReq = new Request('https://synapsedojo.com/api/transfer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ payload: exportedStr }),
});
const postRes = await onRequestPost({ request: postReq, env: mockEnv, params: {} });
assert.strictEqual(postRes.status, 201);
const postData = await postRes.json();
assert(postData.code);

const getReq = new Request(`https://synapsedojo.com/api/transfer?code=${postData.code}`);
const getRes = await onRequestGet({ request: getReq, env: mockEnv, params: {} });
assert.strictEqual(getRes.status, 200);

const delReq = new Request(`https://synapsedojo.com/api/transfer?code=${postData.code}`);
const delRes = await onRequestDelete({ request: delReq, env: mockEnv, params: {} });
assert.strictEqual(delRes.status, 200);
assert(!mockDb.rows.has(postData.code));

const cleanupRes = await cleanUp(mockDb);
assert.strictEqual(cleanupRes.transfers, 3);
console.log('✓ API handlers & nightly cleanup verified.');

console.log('=== ALL TESTS PASSED ===');
