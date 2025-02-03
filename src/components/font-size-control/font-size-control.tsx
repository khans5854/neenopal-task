import { useDebounce } from "@/hooks/use-debounce";
import {
  selectNodeById,
  selectNodeFontSizes,
  updateNodeFontSize,
} from "@/store/slices";
import {
  DEBOUNCE_DELAY,
  DEFAULT_NODE_FONT_SIZE,
  NODE_FONT_SIZES,
} from "@/utils";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const FontSizeControl: FC<{ id: string }> = ({ id }) => {
  const { fontSize, setFontSize } = useFontSizeControl({ id });

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="font-size-slider"
        className="text-lg font-medium text-gray-700"
      >
        Font Size:
      </label>
      <input
        id="font-size-slider"
        type="range"
        min={NODE_FONT_SIZES.MIN}
        max={NODE_FONT_SIZES.MAX}
        value={fontSize}
        onChange={(e) => {
          const newFontSize = Number(e.target.value);
          setFontSize(newFontSize);
        }}
        onClick={(e) => {
          // Prevent click event from bubbling up to parent elements
          e.stopPropagation();
        }}
        className="w-44 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-lg text-gray-600">{fontSize}px</span>
    </div>
  );
};

const useFontSizeControl = ({ id }: { id: string }) => {
  // Get the font sizes for all nodes from Redux store
  const nodeFontSizes = useSelector(selectNodeFontSizes);

  // Get the specific node by ID from Redux store
  const node = useSelector(selectNodeById(id));

  // Calculate the effective font size for this node:
  // 1. First check nodeFontSizes map
  // 2. Then fallback to node's data.fontSize
  // 3. Finally fallback to default font size
  const [fontSize, setFontSize] = useState(
    nodeFontSizes[id] ?? node?.data?.fontSize ?? DEFAULT_NODE_FONT_SIZE,
  );

  const dispatch = useDispatch();

  const debouncedFontSize = useDebounce(fontSize, DEBOUNCE_DELAY);

  useEffect(() => {
    dispatch(updateNodeFontSize({ nodeId: id, fontSize: debouncedFontSize }));
  }, [debouncedFontSize, dispatch, id]);

  return { fontSize, setFontSize };
};
