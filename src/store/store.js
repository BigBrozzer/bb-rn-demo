import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import { initReducer, appReducer, settingsReducer } from './reducers';
import { bbMiddleware, bbMLabProvider } from 'big-brother';

const mainReducer = combineReducers({
    app: appReducer,
    settings: settingsReducer,
    init: initReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'JOURNEY_REPRODUCING') {
        return action.initialState;
    }

    return mainReducer(state, action)
}

const journeyMiddleware = bbMiddleware(rootReducer, bbMLabProvider({
    dbName: 'my-package',
    collName: 'journey',
    apiKey: 'Orf_sZpA2Pp2O5JdEoVUOZqq5dcRpeO5',
}));

export default createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(journeyMiddleware),
    autoRehydrate(),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);
