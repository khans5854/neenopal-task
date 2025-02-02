export interface Node {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    color: string;
    fontSize: number;
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
  error: string | null;
}
