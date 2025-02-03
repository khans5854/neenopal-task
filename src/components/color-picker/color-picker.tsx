import {
  selectNodeBgColors,
  selectNodeById,
  selectNodeColors,
  updateNodeBgColor,
  updateNodeTextColor,
} from "@/store/slices";
import { DEFAULT_NODE_BG_COLOR, DEFAULT_NODE_COLOR } from "@/utils";
import { ChangeEventHandler, FC, useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// ColorPicker component allows users to customize node text and background colors
export const ColorPicker: FC<{ id: string }> = ({ id }) => {
  // Get the node and its current color settings from Redux store
  const node = useSelector(selectNodeById(id));
  const nodeColors = useSelector(selectNodeColors);
  const nodeBgColors = useSelector(selectNodeBgColors);
  const dispatch = useDispatch();

  // Calculate the final text color, falling back to defaults if not set
  const finalColor = useMemo(
    () => nodeColors[id] ?? node?.data?.color ?? DEFAULT_NODE_COLOR,
    [nodeColors, id, node?.data?.color],
  );
  
  // Calculate the final background color, falling back to defaults if not set
  const finalBgColor = useMemo(
    () =>
      nodeBgColors[id] ?? node?.data?.backgroundColor ?? DEFAULT_NODE_BG_COLOR,
    [nodeBgColors, id, node?.data?.backgroundColor],
  );

  return (
    <div className="flex flex-row gap-6">
      <ColorInput
        value={finalColor}
        onChange={(e) =>
          dispatch(updateNodeTextColor({ nodeId: id, color: e.target.value }))
        }
        label="Color"
      />
      <ColorInput
        value={finalBgColor}
        onChange={(e) =>
          dispatch(updateNodeBgColor({ nodeId: id, color: e.target.value }))
        }
        label="Background Color"
      />
    </div>
  );
};

// Reusable color input component with label
const ColorInput: FC<{
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
}> = ({ value, onChange, label }) => {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="color"
        value={value}
        onChange={onChange}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click event from bubbling up to parent elements
        }}
        className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer"
      />
    </div>
  );
};
