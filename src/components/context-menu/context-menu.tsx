import { ContextMenuProps } from "@/utils";
import { useMemo } from "react";
import { ColorPicker } from "../color-picker";
import { FontSizeControl } from "../font-size-control";

export function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: Readonly<ContextMenuProps>) {
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
