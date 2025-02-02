import { addEdge, updateNodePosition } from "@/store/slices/graphSlice";
import { Connection, NodeChange, NodePositionChange } from "@xyflow/react";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";

const isNodePositionChange = (
  change: NodeChange,
): change is NodePositionChange => {
  return change.type === "position";
};

const isNodePositionValid = (change: NodePositionChange): boolean => {
  return Boolean(
    change.position?.x &&
      change.position?.y &&
      !isNaN(change.position.x) &&
      !isNaN(change.position.y),
  );
};

export const useReactFlow = () => {
  const dispatch = useDispatch();
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change: NodeChange) => {
        if (!isNodePositionChange(change)) {
          return;
        }
        if (!isNodePositionValid(change) || !change.position) {
          return;
        }
        dispatch(
          updateNodePosition({
            id: change.id,
            position: change.position,
          }),
        );
      });
    },
    [dispatch],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      console.log(params, "params");
      dispatch(
        addEdge({ ...params, id:uuidv4() }),
      );
    },
    [dispatch],
  );

  return {
    handleNodesChange,
    onConnect,
  };
};
