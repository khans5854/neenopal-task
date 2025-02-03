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

const isNodePositionChange = (change: NodeChange): change is NodePositionChange =>
  change.type === "position";

const isNodePositionValid = (change: NodePositionChange): boolean =>
  Boolean(
    change.position?.x &&
      change.position?.y &&
      !isNaN(change.position.x) &&
      !isNaN(change.position.y),
  );

export const useReactFlow = () => {
  // State and refs for managing context menu and container reference
  const [menu, setMenu] = useState<ContextMenuProps | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  // Handles node position updates in the graph
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change) => {
        if (isNodePositionChange(change) && isNodePositionValid(change) && change.position) {
          dispatch(updateNodePosition({ id: change.id, position: change.position }));
        }
      });
    },
    [dispatch],
  );

  // Removes an edge when double-clicked
  const onEdgeDoubleClick = useCallback((_: MouseEvent, edge: Edge) => {
    dispatch(removeEdge(edge.id));
  }, [dispatch]);

  // Creates a new edge connection between nodes
  const onConnect = useCallback((params: Connection) => {
    dispatch(addEdge({ ...params, id: uuidv4() }));
  }, [dispatch]);

  // Handles right-click context menu for nodes
  // Positions the menu based on available space in the viewport
  const onNodeContextMenu = useCallback((event: MouseEvent, node: Node) => {
    event.preventDefault();
    const pane = ref.current?.getBoundingClientRect();
    if (!pane) return;

    setMenu({
      id: node.id,
      top: event.clientY < pane.height - 200 ? event.clientY : undefined,
      left: event.clientX < pane.width - 200 ? event.clientX : undefined,
      right: event.clientX >= pane.width - 200 ? pane.width - event.clientX : undefined,
      bottom: event.clientY >= pane.height - 200 ? pane.height - event.clientY : undefined,
    });
  }, []);

  // Closes the context menu when clicking on the pane
  const onPaneClick = useCallback(() => setMenu(null), []);

  // Return hook values and event handlers
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
