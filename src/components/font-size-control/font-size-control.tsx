import {
  selectNodeById,
  selectNodeFontSizes,
  updateNodeFontSize,
} from "@/store/slices";
import { DEFAULT_NODE_FONT_SIZE, NODE_FONT_SIZES } from "@/utils";
import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const FontSizeControl: FC<{ id: string }> = ({ id }) => {
  const nodeFontSizes = useSelector(selectNodeFontSizes);

  const node = useSelector(selectNodeById(id));

  const dispatch = useDispatch();
  
  const fontSize = useMemo(
    () => nodeFontSizes[id] ?? node?.data?.fontSize ?? DEFAULT_NODE_FONT_SIZE,
    [nodeFontSizes, id, node?.data?.fontSize],
  );
  
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
          dispatch(updateNodeFontSize({ nodeId: id, fontSize: newFontSize }));
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-44 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-lg text-gray-600">{fontSize}px</span>
    </div>
  );
};
