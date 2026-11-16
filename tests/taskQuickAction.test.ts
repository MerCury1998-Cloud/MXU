import { test } from 'node:test';
import assert from 'node:assert/strict';

import { resolveTaskQuickActionPath } from '../src/utils/taskQuickAction.ts';

test('resolveTaskQuickActionPath：相对路径解析到数据目录', () => {
  assert.equal(
    resolveTaskQuickActionPath('D:/MaaPet', 'debug/reports/report.html'),
    'D:/MaaPet/debug/reports/report.html',
  );
});

test('resolveTaskQuickActionPath：兼容反斜杠并清理重复分隔符', () => {
  assert.equal(
    resolveTaskQuickActionPath('D:\\MaaPet\\', 'debug\\reports//report.html'),
    'D:/MaaPet/debug/reports/report.html',
  );
});

test('resolveTaskQuickActionPath：拒绝绝对路径和目录穿越', () => {
  assert.throws(() => resolveTaskQuickActionPath('D:/MaaPet', 'C:/Windows/win.ini'));
  assert.throws(() => resolveTaskQuickActionPath('D:/MaaPet', '/etc/passwd'));
  assert.throws(() => resolveTaskQuickActionPath('D:/MaaPet', '../outside.txt'));
  assert.throws(() => resolveTaskQuickActionPath('D:/MaaPet', 'debug/../../outside.txt'));
});
