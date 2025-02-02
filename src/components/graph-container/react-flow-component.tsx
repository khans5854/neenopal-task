import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { NodeCustomizationPanel } from "./node-customization-panel";
import {Params } from "@/utils";

const initialNodes = [
  {
    id: "1",
    data: { label: "Node 1", color: "red", fontSize: 20 },
    position: { x: 600, y: 0 },
    type: "selectorNode",
  },
  {
    id: "2",
    type: "selectorNode",
    data: { label: "Node 2", color: "blue", fontSize: 20 },
    position: { x: 300, y: 100 },
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 900, y: 100 },
    type: "selectorNode",
  },
  {
    id: "4",
    data: { label: "Node 4" },
    position: { x: 100, y: 200 },
    type: "selectorNode",
  },
  {
    id: "5",
    data: { label: "Node 5" },
    position: { x: 500, y: 200 },
    type: "selectorNode",
  },
  {
    id: "6",
    data: { label: "Node 6" },
    position: { x: 700, y: 200 },
    type: "selectorNode",
  },
  {
    id: "7",
    data: { label: "Node 7" },
    position: { x: 1100, y: 200 },
    type: "selectorNode",
  },
  {
    id: "8",
    data: { label: "Node 8" },
    position: { x: 0, y: 300 },
    type: "selectorNode",
  },
  {
    id: "9",
    data: { label: "Node 9" },
    position: { x: 200, y: 300 },
    type: "selectorNode",
  },
  {
    id: "10",
    data: { label: "Node 10" },
    position: { x: 500, y: 300 },
    type: "selectorNode",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "1", target: "3" },
  { id: "e3-4", source: "2", target: "4" },
  { id: "e4-5", source: "2", target: "5" },
  { id: "e5-6", source: "3", target: "6" },
  { id: "e6-7", source: "3", target: "7" },
  { id: "e7-8", source: "4", target: "8" },
  { id: "e8-9", source: "4", target: "9" },
  { id: "e9-10", source: "5", target: "10" },
];

const nodeTypes = {
  selectorNode: NodeCustomizationPanel,
};

export const ReactFlowComponent = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Params) => {
      console.log(params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
