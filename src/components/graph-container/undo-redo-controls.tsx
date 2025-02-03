import { useUndoRedo } from "@/hooks";
import { ControlButton } from "@xyflow/react";
import { RedoIcon, UndoIcon } from "../icons";

/**
 * UndoRedoControls component provides undo/redo functionality buttons
 * for the graph editor. It uses the useUndoRedo hook to manage state history
 * and displays two control buttons with undo/redo icons.
 */
export const UndoRedoControls = () => {
  // Get undo/redo functions and their disabled states from the hook
  const { undo, redo, isUndoDisabled, isRedoDisabled } = useUndoRedo();

  return (
    <>
      {/* Undo button - disabled when there's nothing to undo */}
      <ControlButton disabled={isUndoDisabled} onClick={undo}>
        <UndoIcon />
      </ControlButton>

      {/* Redo button - disabled when there's nothing to redo */}
      <ControlButton disabled={isRedoDisabled} onClick={redo}>
        <RedoIcon />
      </ControlButton>
    </>
  );
};
