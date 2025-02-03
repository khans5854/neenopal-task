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

export interface Action {
  type: string;
  payload: string;
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
