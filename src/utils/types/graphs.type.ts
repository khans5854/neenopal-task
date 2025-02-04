export interface Node {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    color: string;
    fontSize: number;
    backgroundColor?: string;
  };
  type: string;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface GraphState {
  graphData: {
    nodes: Node[];
    edges: Edge[];
  };
  isLoading: boolean;
}

export interface NodeStylingState {
  nodeColors: { [nodeId: string]: string };
  nodeBgColors: { [nodeId: string]: string };
  nodeFontSizes: { [nodeId: string]: number };
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface HistoricalState {
  graph: GraphState;
  nodeStyling: NodeStylingState;
}

export interface TrackChanges {
  date: string;
  description?: string;
  type?: string;
  nodeName?: string;
  color?: string;
  action?: string;
}

export interface HistoryState {
  // Stores previous states for undo functionality
  past: { graph: GraphState; nodeStyling: NodeStylingState }[];
  // Stores states that were undone for redo functionality
  future: { graph: GraphState; nodeStyling: NodeStylingState }[];
  // Stores track changes
  trackChanges: TrackChanges[];
}
