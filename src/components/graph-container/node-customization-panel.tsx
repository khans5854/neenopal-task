import { Node } from "@/utils";
import { Handle, Position } from "@xyflow/react";

interface NodeCustomizationPanelProps<T> {
  readonly data: T;
  readonly isConnectable: boolean;
  readonly id: string;
}

export function NodeCustomizationPanel<T extends Node["data"]>({
  data,
  isConnectable,
  id,
}: NodeCustomizationPanelProps<T>) {
  const handleClick = () => {
    console.log("clicked", id);
  };
  return (
    <button
      className="bg-white rounded-md py-1 px-4 border  border-black focus:border-3 focus:border-primary"
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div
        className="text-center"
        style={{ fontSize: data.fontSize, color: data.color }}
      >
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </button>
  );
}
