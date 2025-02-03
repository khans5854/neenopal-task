import {
  addEdge,
  removeEdge,
  updateNodePosition,
} from "@/store/slices/graphSlice";
import { Connection, NodeChange, NodePositionChange } from "@xyflow/react";
import { MouseEvent, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Edge } from "@/utils";
import { useDispatch } from "react-redux";
import { useGetGraphData } from "@/api/graph";

const isNodePositionChange = (
  change: NodeChange,
): change is NodePositionChange => change.type === "position";

const isNodePositionValid = (change: NodePositionChange): boolean =>
  Boolean(
    change.position?.x &&
      change.position?.y &&
      !isNaN(change.position.x) &&
      !isNaN(change.position.y),
  );

export const useReactFlow = () => {
  // Fetch graph data (nodes and edges) from API
  const { graphData } = useGetGraphData();

  const dispatch = useDispatch();

  // Handles node position updates in the graph
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change) => {
        if (
          isNodePositionChange(change) &&
          isNodePositionValid(change) &&
          change.position
        ) {
          dispatch(
            updateNodePosition({ id: change.id, position: change.position }),
          );
        }
      });
    },
    [dispatch],
  );

  // Removes an edge when double-clicked
  const onEdgeDoubleClick = useCallback(
    (_: MouseEvent, edge: Edge) => {
      dispatch(removeEdge(edge.id));
    },
    [dispatch],
  );

  // Creates a new edge connection between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      dispatch(addEdge({ ...params, id: uuidv4() }));
    },
    [dispatch],
  );

  // Return hook values and event handlers
  return {
    graphData,
    handleNodesChange,
    onConnect,
    onEdgeDoubleClick,
  };
};
