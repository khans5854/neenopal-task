import { trackChangesSelector } from "@/store/slices";
import { FORMAT_DATE, TrackChanges } from "@/utils";
import { FC } from "react";
import { useSelector } from "react-redux";

// Timeline component displays a vertical list of track changes events
// showing modifications made to nodes in chronological order
export const Timeline = () => {
  const trackChanges = useSelector(trackChangesSelector);

  if (!trackChanges || trackChanges.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500" role="status">
        No Track Changes
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-2">
      <div className="relative">
        <ol className="space-y-2 flex flex-col-reverse" role="list">
          {trackChanges.map((event) => (
            <TimelineItem
              key={`${event.date}-${event.type}-${event.nodeName}`}
              event={event}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

interface TimelineItemProps {
  event: TrackChanges;
}

// TimelineItem renders individual timeline entries with a connecting line,
// dot marker, and formatted event information
const TimelineItem: FC<TimelineItemProps> = ({ event }) => (
  <li className="relative pl-8">
    <div
      className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"
      aria-hidden="true"
    ></div>
    <div
      className="absolute left-4 top-6 transform -translate-x-1/2 z-10"
      aria-hidden="true"
    >
      <div className="w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
    </div>
    <div className="px-2 pt-5">
      <p className="text-gray-700 mb-1">
        {event?.action && (
          <span className="text-gray-500 font-bold">
            {event.action === "undo" ? "Undid - " : "Redid - "}
          </span>
        )}
        {renderDescription(event)}
      </p>
      <time className="text-sm text-gray-500">{formatDate(event.date)}</time>
    </div>
  </li>
);

// Formats date strings/timestamps into a human-readable format
// Returns 'Invalid date' if formatting fails
const formatDate = (date: string | number) => {
  try {
    return FORMAT_DATE(new Date(date));
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

// Generates appropriate description text based on the type of change
// Handles special cases for text color and background color changes
const renderDescription = (change: TrackChanges) => {
  const nodeName = <span className="font-bold">{change.nodeName}</span>;

  if (change.type === "textColor" || change.type === "backgroundColor") {
    if (!change.color) return null;

    const propertyLabel =
      change.type === "textColor" ? "text color" : "background color";
    const colorDisplay = !change.action && (
      <ColorDisplay color={change.color} />
    );

    return (
      <span>
        Changed Node {nodeName} {propertyLabel}{" "}
        {!change.action && <>to {colorDisplay}</>}
      </span>
    );
  }

  return (
    <span dangerouslySetInnerHTML={{ __html: change.description || "" }} />
  );
};

interface ColorDisplayProps {
  color: string;
}

// Displays a color value with a visual color swatch and hex code
const ColorDisplay: FC<ColorDisplayProps> = ({ color }) => (
  <span className="inline-flex items-center align-middle">
    <span
      className="inline-block w-4 h-4 border border-gray-200 rounded mr-1 align-middle -mt-0.5"
      style={{ backgroundColor: color }}
      role="presentation"
      aria-hidden="true"
    ></span>
    <code className="text-sm bg-gray-100 px-1 rounded align-middle font-bold">
      {color}
    </code>
  </span>
);
