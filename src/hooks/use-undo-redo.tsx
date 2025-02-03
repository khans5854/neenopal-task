import { updateGraphData, updateNodeStyling } from "@/store/slices";
import {
  getCurrentState,
  getLastState,
  getNextState,
  isRedoable,
  isUndoable,
  redoState,
  undoState,
} from "@/store/slices/historySlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUndoRedo = () => {
  const dispatch = useDispatch();
  // Check if undo/redo operations are available based on history state
  const isUndoDisabled = !useSelector(isUndoable);
  const isRedoDisabled = !useSelector(isRedoable);

  // Get the current, previous, and next states from the history
  const currentState = useSelector(getCurrentState);
  const lastState = useSelector(getLastState);
  const nextState = useSelector(getNextState);

  // Handles reverting to the previous state
  const undo = useCallback(() => {
    if (isUndoDisabled || !lastState) return;
    dispatch(undoState(currentState));
    dispatch(updateGraphData(lastState.graph));
    dispatch(updateNodeStyling(lastState.nodeStyling));
  }, [isUndoDisabled, lastState, currentState, dispatch]);

  // Handles moving forward to the next state
  const redo = useCallback(() => {
    if (isRedoDisabled || !nextState) return;
    dispatch(redoState(currentState));
    dispatch(updateGraphData(nextState.graph));
    dispatch(updateNodeStyling(nextState.nodeStyling));
  }, [isRedoDisabled, nextState, currentState, dispatch]);

  return { undo, redo, isUndoDisabled, isRedoDisabled };
};
