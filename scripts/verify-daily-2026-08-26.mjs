import fs from 'node:fs';
import assert from 'node:assert/strict';
import { mergeWorkspaceStates } from '../lib/workspace-contract.ts';

const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const packet = read('operator-packets/2026-08-26-daily-batch.json');
const state = packet.state;
const old = read('operator-packets/2026-08-25-daily-batch.json').state;
assert.equal(packet.schemaVersion, 2);
assert.equal(packet.mode, 'merge');
assert.equal(state.hotspots.length, 20);
assert.equal(state.drafts.length, 20);
assert.equal(state.hotspots.filter(h => h.recommended).length, 8);
assert.equal(state.drafts.filter(d => d.videoScript).length, 8);
assert.equal(new Set(state.hotspots.map(h => h.sourceUrl)).size, 20);
for (const h of state.hotspots) {
  for (const key of ['title','summary','localizedTranslation','angle','humanCheck','sourceUrl','discussionUrl','sourceCapturedAt']) {
    assert.equal(typeof h[key], 'string', `${h.id}.${key}`);
    assert.ok(h[key].trim(), `${h.id}.${key}`);
  }
  assert.ok(h.discussionFocus.length && h.commentSamples.length && h.evidence.length);
  assert.equal(h.selected, false);
  assert.equal(h.status, '待选题');
  assert.equal(h.engagement.views, null);
  if (h.engagement.points !== undefined) assert.equal(h.engagement.likes, null);
  for (const c of h.verifiedComments) {
    assert.ok(c.url.endsWith(`id=${c.id}`));
    assert.ok(c.author && c.quote && c.capturedAt);
  }
}
for (const d of state.drafts) {
  assert.ok(d.body.length > 100 && d.visual.length > 15);
  assert.equal(d.reviewNote, '');
  assert.equal(d.status, '待审核');
  if (d.videoScript) assert.ok(d.videoDurationEstimateSeconds >= 30 && d.videoDurationEstimateSeconds <= 60);
}
// Test actual merge logic without writing any workspace state.
const fixture = structuredClone(old);
fixture.drafts[0].reviewNote = '人工意见：保留原稿，暂不改写';
fixture.drafts[0].body = '人工正文，不应被每日导入覆盖';
fixture.auditEvents = [{ id: 'test-existing-audit-event', detail: '必须保留' }];
const merged = mergeWorkspaceStates(fixture, state);
for (const previous of fixture.drafts) {
  const current = merged.drafts.find(d => d.id === previous.id);
  assert.ok(current, `Old draft missing ${previous.id}`);
  assert.equal(current.body, previous.body);
  assert.equal(current.reviewNote, previous.reviewNote);
  assert.equal(current.version, previous.version);
  assert.equal(current.status, previous.status);
}
assert.deepEqual(merged.auditEvents, fixture.auditEvents);
for (const version of fixture.draftHistory ?? []) {
  assert.ok(merged.draftHistory.some(v => JSON.stringify(v) === JSON.stringify(version)));
}
assert.equal(merged.hotspots.length, fixture.hotspots.length + 20);
assert.equal(merged.drafts.length, fixture.drafts.length + 20);
console.log(JSON.stringify({valid:true,candidates:20,drafts:20,recommended:8,videoScripts:8,oldDraftsPreserved:fixture.drafts.length,oldVersionsPreserved:fixture.draftHistory?.length??0,reviewNotesPreserved:true,auditEventsPreserved:true}));
