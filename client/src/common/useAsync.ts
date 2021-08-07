import { useCallback, useMemo, useReducer } from 'react';

export interface AsyncOperationState<T> {
  loading: boolean;
  error: unknown | null;
  value: T | null;
}

export const useAsync = <T>(fn: (...args: unknown[]) => Promise<T>) => {
  const initialState: AsyncOperationState<T> = {
    loading: false,
    error: null,
    value: null,
  };
  const stateReducer = (_: any, action: any) => {
    switch (action.type) {
      case 'start':
        return { loading: true };
      case 'finish':
        return { loading: false, value: action.value };
      case 'error':
        return { loading: false, error: action.error };
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState as any) as [
    AsyncOperationState<T>,
    any
  ];

  const run = useCallback(
    async (...args: unknown[]) => {
      try {
        dispatch({ type: 'start' });
        const value = await fn(...args);
        dispatch({ type: 'finish', value });
      } catch (error) {
        dispatch({ type: 'error', error });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return useMemo(() => ({ ...state, run }), [state, run]);
};
