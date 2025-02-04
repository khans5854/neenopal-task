import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { CloseIcon } from "../icons";

export const FeaturesDialog = () => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={setOpen}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full relative max-w-lg rounded-xl shadow-2xl bg-white p-6 duration-300 ease-out data-[state=closed]:scale-95 data-[state=closed]:opacity-0"
          >
            <div className="absolute top-1 right-0 flex duration-500 ease-in-out data-[state=closed]:opacity-0 sm:-ml-10 sm:pr-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative z-50 rounded-md cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 text-gray-900 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-black border-b border-zinc-800 pb-2 mb-4">
                  Flow Editor Features
                </h2>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black border-b border-zinc-800 pb-2 mb-3">
                  Node Interactions
                </h3>
                <ul className="space-y-3 pl-4">
                  <li>
                    <span className="text-primary font-medium">
                      Node Customization:
                    </span>{" "}
                    Right-click a node to open the style menu
                    <ul className="list-disc pl-6 text-black space-y-1 mt-1">
                      <li>Change text color</li>
                      <li>Modify background color</li>
                      <li>Adjust font size</li>
                    </ul>
                  </li>
                  <li>
                    <span className="text-primary font-medium">
                      Position Changes:
                    </span>{" "}
                    Drag nodes freely to reposition them
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black border-b border-zinc-800 pb-2 mb-3">
                  Connection Management
                </h3>
                <ul className="space-y-3 pl-4">
                  <li>
                    <span className="text-primary font-medium">
                      Connect Nodes:
                    </span>{" "}
                    Click on a node's connection point and drag to another
                    node's connection point
                  </li>
                  <li>
                    <span className="text-primary font-medium">
                      Remove Edge:
                    </span>{" "}
                    Double-click any edge to remove it instantly
                  </li>
                </ul>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
