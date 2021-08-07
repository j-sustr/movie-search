import { useReducer } from 'react';

export interface AsyncOperationState<T> {
  loading: boolean;
  error?: unknown;
  value?: T;
}

export const useAsync = <T>(fn: (...args: unknown[]) => Promise<T>) => {
  const initialState: AsyncOperationState<T> = {
    loading: false,
    error: undefined,
    value: undefined,
  };
  const stateReducer = (_: any, action: any) => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null };
      case 'finish':
        return { loading: false, error: null, value: action.value };
      case 'error':
        return { loading: false, error: action.error, value: null };
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState as any);

  const run = async (...args: unknown[]) => {
    try {
      dispatch({ type: 'start' });
      const value = await fn(...args);
      dispatch({ type: 'finish', value });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  };

  return { ...state, run };
};
