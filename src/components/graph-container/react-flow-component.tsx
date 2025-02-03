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
  const { graphData } = useGetGraphData();

  const {
    handleNodesChange,
    onConnect,
    onPaneClick,
    onNodeContextMenu,
    menu,
    ref,
    onEdgeDoubleClick,
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
        fitView
      >
        <Controls>
          <UndoRedoControls />
        </Controls>
        <MiniMap />
        <Background gap={12} size={1} />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlow>
    </div>
  );
};
