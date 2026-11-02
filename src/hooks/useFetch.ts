import { useEffect, useState } from "react";

/** The three states every request can be in. `status` tells TypeScript which fields exist. */
export type FetchState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

type SettledState<T> = Exclude<FetchState<T>, { status: "loading" }>;

/** A function that performs the request. Must be stable (module-level or wrapped in useCallback). */
export type Loader<T> = (signal: AbortSignal) => Promise<T>;

interface FetchResult<T> {
  load: Loader<T>;
  state: SettledState<T>;
}

/**
 * Runs `load` inside useEffect and reports its loading / error / success state.
 * It runs again whenever `load` changes, e.g. when the champion id in the URL changes.
 */
export function useFetch<T>(load: Loader<T>): FetchState<T> {
  // The finished result, remembered together with the loader that produced it.
  const [result, setResult] = useState<FetchResult<T> | null>(null);

  useEffect(() => {
    // Cancels the request if the component unmounts or `load` changes before it finishes,
    // so an old response can never overwrite a newer one.
    const controller = new AbortController();

    load(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setResult({ load, state: { status: "success", data } });
        }
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          const message = error instanceof Error ? error.message : "Something went wrong";
          setResult({ load, state: { status: "error", message } });
        }
      });

    return () => controller.abort();
  }, [load]);

  // No result yet, or a result from an older loader (e.g. the previous champion), means loading.
  if (result === null || result.load !== load) {
    return { status: "loading" };
  }
  return result.state;
}
