import { Node } from "@/utils";
import { Handle, Position } from "@xyflow/react";

interface NodeCustomizationPanelProps<T> {
  readonly data: T;
  readonly isConnectable: boolean;
}

export function NodeCustomizationPanel<T extends Node["data"]>({
  data,
  isConnectable,
}: NodeCustomizationPanelProps<T>) {
  return (
    <div
      className="bg-white rounded-md py-1 px-4 border border-gray-400 hover:bg-gray-100"
      style={{ backgroundColor: data.backgroundColor }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div
        className="text-center font-bold"
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
    </div>
  );
}
