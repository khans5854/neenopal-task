import { fetchGraphData } from "@/api/graph";
import { Edge, GraphState } from "@/utils";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: GraphState = {
  graphData: {
    nodes: [],
    edges: [],
  },
  isLoading: false,
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    updateGraphData: (state, action: PayloadAction<GraphState>) => {
      state.graphData = action.payload.graphData;
    },
    fetchGraphDataStart: (state) => {
      state.isLoading = true;
    },
    fetchGraphDataSuccess: (state, action: PayloadAction<GraphState>) => {
      state.isLoading = false;
      state.graphData = action.payload.graphData;
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>,
    ) => {
      const node = state.graphData.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
      }
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      if (!state.graphData.edges.find((edge) => edge.id === action.payload.id)) {
        state.graphData.edges.push(action.payload);
      }
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.graphData.edges = state.graphData.edges.filter(
        (edge) => edge.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGraphData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGraphData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.graphData = action.payload.data.graphData;
    });
  },
});

export const { updateNodePosition, addEdge, removeEdge, updateGraphData } = graphSlice.actions;


export const selectGraphData = (state: RootState) => state.graph;
export const selectNodes = (state: RootState) => state.graph.graphData.nodes;
export const selectEdges = (state: RootState) => state.graph.graphData.edges;

export const selectNodeById = (id: string) =>
  createSelector(
    (state: RootState) => state.graph.graphData.nodes,
    (nodes) => nodes.find((node) => node.id === id),
  );

export const selectNodesWithModifications = createSelector(
  [selectEdges, selectNodes,
   (state: RootState) => state.nodeStyling.nodeColors,
   (state: RootState) => state.nodeStyling.nodeBgColors,
   (state: RootState) => state.nodeStyling.nodeFontSizes],
  (edges, nodes, nodeColors, nodeBgColors, nodeFontSizes) => {
    if (!nodes.length) return { graphData: { edges, nodes: [] } };

    const modifiedNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        color: nodeColors[node.id] || node.data.color,
        backgroundColor: nodeBgColors[node.id] || node.data.backgroundColor,
        fontSize: nodeFontSizes[node.id] || node.data.fontSize,
      },
    }));

    return { graphData: { edges, nodes: modifiedNodes } };
  },
);

export default graphSlice.reducer;
