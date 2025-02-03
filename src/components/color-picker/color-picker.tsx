import { useDebounce } from "@/hooks";
import {
  selectNodeBgColors,
  selectNodeById,
  selectNodeColors,
  updateNodeBgColor,
  updateNodeTextColor,
} from "@/store/slices";
import {
  DEBOUNCE_DELAY,
  DEFAULT_NODE_BG_COLOR,
  DEFAULT_NODE_COLOR,
} from "@/utils";
import { ChangeEventHandler, FC, useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ColorPicker component allows users to customize node text and background colors
export const ColorPicker: FC<{ id: string }> = ({ id }) => {
  const { finalColor, finalBgColor, setFinalColor, setFinalBgColor } =
    useColorPicker({ id });

  return (
    <div className="flex flex-row gap-6">
      <ColorInput
        value={finalColor}
        onChange={(e) => setFinalColor(e.target.value)}
        label="Color"
      />
      <ColorInput
        value={finalBgColor}
        onChange={(e) => setFinalBgColor(e.target.value)}
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

const useColorPicker = ({ id }: { id: string }) => {
  // Get the node and its current color settings from Redux store
  const node = useSelector(selectNodeById(id));
  const nodeColors = useSelector(selectNodeColors);
  const nodeBgColors = useSelector(selectNodeBgColors);
  const dispatch = useDispatch();

  // Calculate the final text color, falling back to defaults if not set
  const [finalColor, setFinalColor] = useState(
    nodeColors[id] ?? node?.data?.color ?? DEFAULT_NODE_COLOR,
  );

  // Debounce the color change to prevent excessive updates
  const debouncedColor = useDebounce(finalColor, DEBOUNCE_DELAY);

  // Update the node text color when the debounced color changes
  useEffect(() => {
    dispatch(updateNodeTextColor({ nodeId: id, color: debouncedColor }));
  }, [debouncedColor, dispatch, id]);

  // Calculate the final background color, falling back to defaults if not set
  const [finalBgColor, setFinalBgColor] = useState(
    nodeBgColors[id] ?? node?.data?.backgroundColor ?? DEFAULT_NODE_BG_COLOR,
  );

  // Debounce the background color change to prevent excessive updates
  const debouncedBgColor = useDebounce(finalBgColor, DEBOUNCE_DELAY);

  // Update the node background color when the debounced background color changes
  useEffect(() => {
    dispatch(updateNodeBgColor({ nodeId: id, color: debouncedBgColor }));
  }, [debouncedBgColor, dispatch, id]);

  return { finalColor, finalBgColor, setFinalColor, setFinalBgColor };
};
