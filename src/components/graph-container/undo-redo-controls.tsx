import { iconPath } from "@/assets/icons";
import { ControlButton } from "@xyflow/react";
export const UndoRedoControls = () => {
  return (
    <>
      <ControlButton>
        <img src={iconPath.undo} alt="undo" />
      </ControlButton>
      <ControlButton>
        <img src={iconPath.redo} alt="redo" />
      </ControlButton>
    </>
  );
};
