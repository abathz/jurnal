import { AnyAction } from 'redux';

export const reduceReducers = (...args: any[]) => {
    const initialState = typeof args[0] !== 'function' && args.shift();
    const reducers = args;

    if (typeof initialState === 'undefined') {
        throw new TypeError(
            'The initial state may not be undefined. If you do not want to set a value for this reducer, you can use null instead of undefined.'
        );
    }

    return (prevState: any, value: any, ...args: any[]) => {
        const prevStateIsUndefined = typeof prevState === 'undefined';
        const valueIsUndefined = typeof value === 'undefined';

        if (prevStateIsUndefined && valueIsUndefined && initialState) {
            return initialState;
        }

        return reducers.reduce(
            (newState, reducer, index) => {
                if (typeof reducer === 'undefined') {
                    throw new TypeError(`An undefined reducer was passed in at index ${index}`);
                }

                return reducer(newState, value, ...args);
            },
            prevStateIsUndefined && !valueIsUndefined && initialState ? initialState : prevState
        );
    };
};

export const createReducer = (initialState: any, handlers: any) => (state = initialState, action: AnyAction) => {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
};
