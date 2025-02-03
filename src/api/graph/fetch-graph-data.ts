import { selectNodesWithModifications } from "@/store/slices";
import { AppDispatch } from "@/store/store";
import { GraphState } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

/**
 * Async thunk action creator that fetches graph data from a JSON file
 * @returns Promise containing the graph data and state information
 * @throws Returns rejected value if fetch fails or errors occur
 */
const fetchGraphData = createAsyncThunk<{ data: GraphState }>(
  "graph/fetchGraphData",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await fetch("/mock-data/graph-data.json", {
        signal,
      });
      if (response.ok) {
        const graphData = await response.json();
        return { data: { graphData, isLoading: false, error: null } };
      }
      return rejectWithValue("Failed to fetch graph data");
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

/**
 * Custom hook that handles fetching and selecting graph data
 * - Dispatches fetchGraphData on mount
 * - Cleans up by aborting fetch on unmount
 * - Returns the selected nodes with modifications from the store
 * @returns Selected nodes with their modifications
 */
const useGetGraphData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promise = dispatch(fetchGraphData());
    return () => promise.abort();
  }, [dispatch]);
  return useSelector(selectNodesWithModifications, shallowEqual);
};

export { fetchGraphData, useGetGraphData };
