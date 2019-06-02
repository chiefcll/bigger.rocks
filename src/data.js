import store from 'store';
import defaultState from './defaultData';
const { storageKey } = defaultState.settings;

const storedState = store.get(storageKey);
const state = storedState || {
    ...defaultState
};

function saveState(state) {
    store.set(storageKey, state);
}

function _resetState() {
    store.set(storageKey, { ...defaultState });
}

export default {
    state,
    saveState,
    _resetState
};
