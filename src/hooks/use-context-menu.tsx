import { MouseEvent, useCallback, useRef, useState } from "react";
import { ContextMenuProps, Node } from "@/utils";

export const useContextMenu = () => {
  // State and refs for managing context menu and container reference
  const [menu, setMenu] = useState<ContextMenuProps | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  // Closes the context menu when clicking on the pane
  const onPaneClick = useCallback(() => setMenu(null), []);

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
      right:
        event.clientX >= pane.width - 200
          ? pane.width - event.clientX
          : undefined,
      bottom:
        event.clientY >= pane.height - 200
          ? pane.height - event.clientY
          : undefined,
    });
  }, []);

  return {
    menu,
    ref,
    onNodeContextMenu,
    onPaneClick,
  };
};
