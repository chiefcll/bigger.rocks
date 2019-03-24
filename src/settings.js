import store from 'store';
import settings from './settings';
const storageKey = 'settings';
const defaultState = {
    incrementWeightBy: 5,
    units: 'lbs'
};
const storedState = store.get(storageKey);
const state = storedState || {
    ...defaultState
};

function saveState(state) {
    store.set(storageKey, state);
}

export default {
    ...state,
    saveState
};
