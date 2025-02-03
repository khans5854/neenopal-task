import { useGetGraphData } from "@/api/graph";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ContextMenu } from "../context-menu";
import { NodeCustomizationPanel } from "./node-customization-panel";
import { UndoRedoControls } from "./undo-redo-controls";
import { useReactFlow } from "@/hooks";

const nodeTypes = {
  selectorNode: NodeCustomizationPanel,
};

export const ReactFlowComponent = () => {
  // Fetch graph data (nodes and edges) from API
  const { graphData } = useGetGraphData();

  // Custom hook that provides graph interaction handlers
  const {
    handleNodesChange,  // Handler for node modifications (position, deletion, etc.)
    onConnect,         // Handler for creating new edge connections
    onPaneClick,      // Handler for clicks on the graph canvas
    onNodeContextMenu, // Handler for right-click context menu on nodes
    menu,             // State for context menu position and content
    ref,              // Reference to the ReactFlow instance
    onEdgeDoubleClick, // Handler for double-clicking edges
  } = useReactFlow();

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        ref={ref}
        nodes={graphData.nodes}
        edges={graphData.edges}
        onNodesChange={handleNodesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeDoubleClick={onEdgeDoubleClick}
        fitView  // Automatically fits the graph view to show all nodes
      >
        <Controls>
        {/* Graph controls including undo/redo functionality */}
          <UndoRedoControls />
        </Controls>
        {/* Minimap for graph overview */}
        <MiniMap />
        {/* Background grid pattern */}
        <Background gap={12} size={1} />
        {/* Context menu that appears on right-click */}
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlow>
    </div>
  );
};
