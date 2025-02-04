import { pushState } from "@/store/slices";
import { Dispatch, MiddlewareAPI, UnknownAction } from "@reduxjs/toolkit";
import { debounce } from "../debounce";
import { HistoricalState } from "../types";

type StoreType<T> = MiddlewareAPI<Dispatch<UnknownAction>, T>;

export function createDebounceStateManager<T>(waitTime: number = 300) {
  // Private variable to store the initial state
  let initialHistoricalState: HistoricalState | null = null;

  // Create the debounced push state function
  const debouncedPushState = debounce((store: StoreType<T>) => {
    if (initialHistoricalState) {
      store.dispatch(pushState(initialHistoricalState));
      initialHistoricalState = null;
    }
  }, waitTime);

  return {
    // Method to set initial state
    setInitialState(state: HistoricalState) {
      if (!initialHistoricalState) {
        initialHistoricalState = state;
      }
    },

    // Method to push state with debounce
    pushDebouncedState(store: StoreType<T>) {
      debouncedPushState(store);
    },

    // Method to get current initial state
    getInitialState() {
      return initialHistoricalState;
    },

    // Method to clear initial state
    clearInitialState() {
      initialHistoricalState = null;
    },
  };
}
