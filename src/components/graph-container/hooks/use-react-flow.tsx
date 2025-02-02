import {
  addEdge,
  removeEdge,
  updateNodePosition,
} from "@/store/slices/graphSlice";
import { Connection, NodeChange, NodePositionChange } from "@xyflow/react";
import { MouseEvent, useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ContextMenuProps, Edge, Node } from "@/utils";
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
  const [menu, setMenu] = useState<ContextMenuProps | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
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

  const onEdgeDoubleClick = (_: MouseEvent, edge: Edge) => {
    dispatch(removeEdge(edge.id));
  };

  const onConnect = useCallback(
    (params: Connection) => {
      dispatch(addEdge({ ...params, id: uuidv4() }));
    },
    [dispatch],
  );

  const onNodeContextMenu = useCallback((event: MouseEvent, node: Node) => {
    event.preventDefault();
    const pane = ref.current?.getBoundingClientRect();
    setMenu({
      id: node.id,
      top:
        event.clientY < (pane?.height ?? 0) - 200 ? event.clientY : undefined,
      left:
        event.clientX < (pane?.width ?? 0) - 200 ? event.clientX : undefined,
      right:
        event.clientX >= (pane?.width ?? 0) - 200
          ? (pane?.width ?? 0) - event.clientX
          : undefined,
      bottom:
        event.clientY >= (pane?.height ?? 0) - 200
          ? (pane?.height ?? 0) - event.clientY
          : undefined,
    });
  }, []);

  const onPaneClick = useCallback(() => setMenu(null), []);

  return {
    handleNodesChange,
    onConnect,
    onNodeContextMenu,
    menu,
    ref,
    onPaneClick,
    onEdgeDoubleClick,
  };
};
