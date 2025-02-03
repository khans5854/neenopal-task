import { useUndoRedo } from "@/hooks";
import { ControlButton } from "@xyflow/react";
import { RedoIcon, UndoIcon } from "../icons";
export const UndoRedoControls = () => {
  const { undo, redo, isUndoDisabled, isRedoDisabled } = useUndoRedo();

  return (
    <>
      <ControlButton disabled={isUndoDisabled} onClick={undo}>
        <UndoIcon />
      </ControlButton>
      <ControlButton disabled={isRedoDisabled} onClick={redo}>
        <RedoIcon />
      </ControlButton>
    </>
  );
};



