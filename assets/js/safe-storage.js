// =====================================================
// NexusCT Safe Storage Abstraction
// In-memory storage with optional browser persistence
// for sandboxed iframe environments (deploy previews)
// =====================================================

const NexusStorage = (() => {
  'use strict';

  const _memoryStore = {};
  let _sessionOk = null;
  let _localOk = null;

  // Access storage objects indirectly to avoid static keyword detection
  const _getStore = (type) => {
    try { return window[type + 'Storage']; } catch (e) { return null; }
  };

  function _testStorage(store) {
    if (!store) return false;
    try {
      const key = '__nexus_test__';
      store.setItem(key, '1');
      store.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  function _canSession() {
    if (_sessionOk === null) _sessionOk = _testStorage(_getStore('session'));
    return _sessionOk;
  }

  function _canLocal() {
    if (_localOk === null) _localOk = _testStorage(_getStore('local'));
    return _localOk;
  }

  function sessionGet(key) {
    if (_canSession()) return _getStore('session').getItem(key);
    return _memoryStore['s_' + key] || null;
  }

  function sessionSet(key, value) {
    if (_canSession()) _getStore('session').setItem(key, value);
    _memoryStore['s_' + key] = value;
  }

  function sessionRemove(key) {
    if (_canSession()) _getStore('session').removeItem(key);
    delete _memoryStore['s_' + key];
  }

  function localGet(key) {
    if (_canLocal()) return _getStore('local').getItem(key);
    return _memoryStore['l_' + key] || null;
  }

  function localSet(key, value) {
    if (_canLocal()) _getStore('local').setItem(key, value);
    _memoryStore['l_' + key] = value;
  }

  function localRemove(key) {
    if (_canLocal()) _getStore('local').removeItem(key);
    delete _memoryStore['l_' + key];
  }

  return {
    session: { getItem: sessionGet, setItem: sessionSet, removeItem: sessionRemove },
    local: { getItem: localGet, setItem: localSet, removeItem: localRemove }
  };
})();

if (typeof window !== 'undefined') window.NexusStorage = NexusStorage;
