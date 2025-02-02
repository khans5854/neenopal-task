import { fetchGraphData } from "@/api/graph";
import { Edge, GraphState } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: GraphState = {
  graphData: {
    nodes: [],
    edges: [],
  },
  isLoading: false,
  error: null,
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    fetchGraphDataStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchGraphDataSuccess: (state, action: PayloadAction<GraphState>) => {
      state.isLoading = false;
      state.error = null;
      state.graphData = action.payload.graphData;
    },
    fetchGraphDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>,
    ) => {
      const node = state.graphData.nodes.find(
        (n) => n.id === action.payload.id,
      );
      if (node) {
        node.position = action.payload.position;
      }
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.graphData.edges.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGraphData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGraphData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.graphData = action.payload.data.graphData;
    });
    builder.addCase(fetchGraphData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? "Failed to fetch graph data";
    });
  },
});

export const { updateNodePosition, addEdge } = graphSlice.actions;
export const selectGraphData = (state: RootState) => state.graph;
export const selectNodes = (state: RootState) => state.graph.graphData.nodes;
export const selectEdges = (state: RootState) => state.graph.graphData.edges;

export default graphSlice.reducer;
