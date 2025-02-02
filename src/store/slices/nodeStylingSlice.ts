import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NodeStylingState {
  nodeColors: { [nodeId: string]: string };
  nodeBgColors: { [nodeId: string]: string };
  nodeFontSizes: { [nodeId: string]: number };
}

const initialState: NodeStylingState = {
  nodeColors: {},
  nodeBgColors: {},
  nodeFontSizes: {},
};

const nodeStylingSlice = createSlice({
  name: "nodeStyling",
  initialState,
  reducers: {
    updateNodeTextColor: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>,
    ) => {
      const { nodeId, color } = action.payload;
      state.nodeColors[nodeId] = color;
    },
    updateNodeBgColor: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>,
    ) => {
      const { nodeId, color } = action.payload;
      state.nodeBgColors[nodeId] = color;
    },
    updateNodeFontSize: (
      state,
      action: PayloadAction<{ nodeId: string; fontSize: number }>,
    ) => {
      const { nodeId, fontSize } = action.payload;
      state.nodeFontSizes[nodeId] = fontSize;
    },
    resetModifications: (state) => {
      state.nodeColors = {};
      state.nodeFontSizes = {};
    },
  },
});

export const {
  updateNodeTextColor,
  updateNodeBgColor,
  updateNodeFontSize,
  resetModifications,
} = nodeStylingSlice.actions;

export const selectNodeColors = (state: RootState) =>
  state.nodeStyling.nodeColors;
export const selectNodeBgColors = (state: RootState) =>
  state.nodeStyling.nodeBgColors;
export const selectNodeFontSizes = (state: RootState) =>
  state.nodeStyling.nodeFontSizes;

export default nodeStylingSlice.reducer;
