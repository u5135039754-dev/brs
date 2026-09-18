import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type DependencyList,
} from 'react';

interface AsyncState<T> {
  data: T | null;
  error: unknown;
  loading: boolean;
}

const INITIAL_STATE: AsyncState<never> = { data: null, error: null, loading: true };

/**
 * Runs `fn` on mount and again whenever `deps` changes, the way a data
 * fetch usually should. State updates are guarded by an `isMounted` ref so
 * a response that resolves after the component unmounts is dropped instead
 * of triggering a React warning.
 */
export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList = []) {
  const [state, setState] = useState<AsyncState<T>>(INITIAL_STATE);
  const isMounted = useRef(false);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const execute = useCallback((): Promise<T | undefined> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    return fnRef
      .current()
      .then((data) => {
        if (isMounted.current) setState({ data, error: null, loading: false });
        return data;
      })
      .catch((error: unknown) => {
        if (isMounted.current) setState({ data: null, error, loading: false });
        return undefined;
      });
    // `fn` is read through `fnRef`, so `deps` alone decides when this
    // should re-run — that's the whole point of taking `deps` as an arg.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    void execute();
  }, [execute]);

  return { ...state, refetch: execute };
}

/**
 * Same shape as `useAsync`, minus the auto-run: nothing fires until the
 * caller invokes `execute`. Fits logins, form submits, and other
 * user-triggered mutations.
 */
export function useAsyncCallback<Args extends unknown[], T>(fn: (...args: Args) => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ data: null, error: null, loading: false });
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const execute = useCallback(
    (...args: Args): Promise<T | undefined> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      return fn(...args)
        .then((data) => {
          if (isMounted.current) setState({ data, error: null, loading: false });
          return data;
        })
        .catch((error: unknown) => {
          if (isMounted.current) setState({ data: null, error, loading: false });
          return undefined;
        });
    },
    [fn],
  );

  return { ...state, execute };
}

/** Wraps `matchMedia`, re-rendering whenever the query's match state flips. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onChange);
      return () => mediaQueryList.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
