import { updateGraphData, updateNodeStyling } from "@/store/slices";
import { getCurrentState, getLastState, getNextState, isRedoable, isUndoable, redoState, undoState } from "@/store/slices/historySlice";
import { useDispatch, useSelector } from "react-redux";

export const useUndoRedo = () => {
  const dispatch = useDispatch();
  const isUndoDisabled = !useSelector(isUndoable);
  const isRedoDisabled = !useSelector(isRedoable);

  const currentState = useSelector(getCurrentState);
  const lastState = useSelector(getLastState);
  const nextState = useSelector(getNextState);

  const undo = () => {
    if (isUndoDisabled || !lastState) return;
    dispatch(undoState(currentState));
    dispatch(updateGraphData(lastState.graph));
    dispatch(updateNodeStyling(lastState.nodeStyling));
  };

  const redo = () => {
    if (isRedoDisabled || !nextState) return;
    dispatch(redoState(currentState));
    dispatch(updateGraphData(nextState.graph));
    dispatch(updateNodeStyling(nextState.nodeStyling));
  };

  return { undo, redo, isUndoDisabled, isRedoDisabled };
};
