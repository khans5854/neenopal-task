import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NodeStylingState } from "@/utils";

const initialState: NodeStylingState = {
  nodeColors: {},
  nodeBgColors: {},
  nodeFontSizes: {},
};

const nodeStylingSlice = createSlice({
  name: "nodeStyling",
  initialState,
  reducers: {
    updateNodeStyling: (
      state,
      action: PayloadAction<Partial<NodeStylingState>> 
    ) => {
      Object.assign(state, action.payload);
    },

    updateNodeTextColor: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>
    ) => {
      state.nodeColors[action.payload.nodeId] = action.payload.color;
    },

    updateNodeBgColor: (
      state,
      action: PayloadAction<{ nodeId: string; color: string }>
    ) => {
      state.nodeBgColors[action.payload.nodeId] = action.payload.color;
    },

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


export const selectNodeColors = (state: RootState) => state.nodeStyling.nodeColors;
export const selectNodeBgColors = (state: RootState) => state.nodeStyling.nodeBgColors;
export const selectNodeFontSizes = (state: RootState) => state.nodeStyling.nodeFontSizes;


export const selectNodeStyling = createSelector(
  [selectNodeColors, selectNodeBgColors, selectNodeFontSizes],
  (nodeColors, nodeBgColors, nodeFontSizes) => ({
    nodeColors,
    nodeBgColors,
    nodeFontSizes,
  })
);

export default nodeStylingSlice.reducer;
