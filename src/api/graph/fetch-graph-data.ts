import { selectGraphData } from "@/store/slices";
import { AppDispatch } from "@/store/store";
import { GraphState } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const useGetGraphData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promise = dispatch(fetchGraphData());
    return () => promise.abort();
  }, [dispatch]);
  return useSelector(selectGraphData);
};

export { useGetGraphData, fetchGraphData };
