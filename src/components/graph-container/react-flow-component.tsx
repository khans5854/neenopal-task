import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import { useReactFlow } from "./hooks";
import { NodeCustomizationPanel } from "./node-customization-panel";
import { useGetGraphData } from "@/api/graph";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  selectorNode: NodeCustomizationPanel,
};

export const ReactFlowComponent = () => {
  const { graphData } = useGetGraphData();
  const { handleNodesChange, onConnect } = useReactFlow();

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={graphData.nodes}
        edges={graphData.edges}
        onNodesChange={handleNodesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
