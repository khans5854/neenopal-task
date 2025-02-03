import { ContextMenuProps } from "@/utils";
import { useMemo } from "react";
import { ColorPicker } from "../color-picker";
import { FontSizeControl } from "../font-size-control";

/**
 * ContextMenu component that provides color and font size controls
 * Positioning is controlled by top/left/right/bottom props
 * @param id - Unique identifier for the target element
 * @param top - Top position value or boolean
 * @param left - Left position value or boolean
 * @param right - Right position value or boolean
 * @param bottom - Bottom position value or boolean
 */
export function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: Readonly<ContextMenuProps>) {
  // Calculate positioning style, converting boolean values to undefined
  // and falling back to "auto" if value is not provided
  const style = useMemo(() => {
    return {
      top: typeof top === "boolean" ? undefined : (top ?? "auto"),
      left: typeof left === "boolean" ? undefined : (left ?? "auto"),
      right: typeof right === "boolean" ? undefined : (right ?? "auto"),
      bottom: typeof bottom === "boolean" ? undefined : (bottom ?? "auto"),
    };
  }, [top, left, right, bottom]);

  return (
    <div
      style={style}
      className="absolute bg-white rounded-md shadow-lg z-30 p-4 flex flex-col gap-6"
      {...props}
    >
      <ColorPicker id={id} />
      <FontSizeControl id={id} />
    </div>
  );
}
