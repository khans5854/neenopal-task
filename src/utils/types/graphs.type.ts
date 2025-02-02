export interface Node {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    color: string;
    fontSize: number;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface Action {
  type: string;
  payload: string;
}

export interface State {
  nodes: Node[];
  edges: Edge[];
}
export interface HistoryState {
  past: Action[];
  present: State;
  future: Action[];
}

export interface Params {
  source: string;
  sourceHandle: string | null;
  target: string;
  targetHandle: string | null;
}
