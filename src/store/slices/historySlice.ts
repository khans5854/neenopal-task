import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
  past: string[];
  present: string;
  future: string[];
}

const initialState: HistoryState = {
  past: [],
  present: "",
  future: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    undo: (state) => {
      if (state.past.length > 0) {
        const previousState = state.past[state.past.length - 1];
        state.future = [state.present, ...state.future];
        state.present = previousState;
        state.past = state.past.slice(0, -1);
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future[0];
        state.past = [...state.past, state.present];
        state.present = nextState;
        state.future = state.future.slice(1);
      }
    },
    recordAction: (state, action: PayloadAction<string>) => {
      state.past = [...state.past, state.present];
      state.present = action.payload;
      state.future = [];
    },
  },
});

export const { undo, redo, recordAction } = historySlice.actions;
export default historySlice.reducer;
