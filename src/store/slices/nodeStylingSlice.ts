import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NodeStylingState } from "@/utils";

const initialState: NodeStylingState = {
  nodeColors: {},
  nodeBgColors: {},
  nodeFontSizes: {},
};

/**
 * Redux slice for managing node styling state
 * Handles text colors, background colors, and font sizes for nodes
 */
const nodeStylingSlice = createSlice({
  name: "nodeStyling",
  initialState,
  reducers: {
    // Updates multiple styling properties at once
    updateNodeStyling: (
      state,
      action: PayloadAction<Partial<NodeStylingState>> 
    ) => {
      Object.assign(state, action.payload);
    },

    // Updates text color for a specific node
    updateNodeTextColor: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>
    ) => {
      state.nodeColors[action.payload.nodeId] = action.payload.color;
    },

    // Updates background color for a specific node
    updateNodeBgColor: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>
    ) => {
      state.nodeBgColors[action.payload.nodeId] = action.payload.color;
    },

    // Updates font size for a specific node
    updateNodeFontSize: (
      state,
      action: PayloadAction<{ nodeId: string; fontSize: number }>
    ) => {
      state.nodeFontSizes[action.payload.nodeId] = action.payload.fontSize;
    }
  },
});

export const {
  updateNodeTextColor,
  updateNodeBgColor,
  updateNodeFontSize,
  updateNodeStyling,
} = nodeStylingSlice.actions;

// Selector functions to access specific styling properties
export const selectNodeColors = (state: RootState) => state.nodeStyling.nodeColors;
export const selectNodeBgColors = (state: RootState) => state.nodeStyling.nodeBgColors;
export const selectNodeFontSizes = (state: RootState) => state.nodeStyling.nodeFontSizes;

/**
 * selector that combines all node styling properties
 * Returns an object containing all styling states
 */
export const selectNodeStyling = createSelector(
  [selectNodeColors, selectNodeBgColors, selectNodeFontSizes],
  (nodeColors, nodeBgColors, nodeFontSizes) => ({
    nodeColors,
    nodeBgColors,
    nodeFontSizes,
  })
);

export default nodeStylingSlice.reducer;
