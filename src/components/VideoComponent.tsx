import React from "react";

export interface VideoComponentProps {
  title: string;
}

export const VideoComponent = React.forwardRef(
  (
    { title }: VideoComponentProps,
    ref: React.MutableRefObject<HTMLVideoElement>
  ) => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <p>{title}</p>
      <video
        crossOrigin="anonymous"
        controls
        style={{ width: 500, height: 300 }}
        autoPlay
        ref={ref}
      />
    </div>
  )
);
