import React, { useEffect, useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { MdOutlineNoTransfer } from "react-icons/md";
import { RxLapTimer } from "react-icons/rx";
import { FcShipped } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";

export default function OrderTrackingStepProgressBar({ status }) {
  console.log(status);
  const [trackingStatus, setTrackingStatus] = useState(0);
  useEffect(() => {
    if (status == "Not Process") {
      setTrackingStatus((prev) => (prev = 22));
    } else if (status == "Processing") {
      setTrackingStatus((prev) => (prev = 35));
    } else if (status == "Shipped") {
      setTrackingStatus((prev) => (prev = 68));
    } else if (status == "Delivered") {
      setTrackingStatus((prev) => (prev = 100));
    } else {
      setTrackingStatus((prev) => (prev = 0));
    }
  }, [status]);
  return (
    <div className="mt-4 mb-10 px-3">
      <ProgressBar percent={trackingStatus} filledBackground="#008000">
        <Step transition="scale">
          {({ accomplished }) => (
            <div className="flex flex-col relative">
              <MdOutlineNoTransfer size={24} />
              <p className="absolute -bottom-5 text-sm">Dispatch</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className="flex flex-col relative">
              <RxLapTimer size={24} />
              <p className="absolute -bottom-5 text-sm">Processed</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className="flex flex-col relative">
              <TbTruckDelivery size={24} />
              <p className="absolute -bottom-5 text-sm">Shipped</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className="flex flex-col relative">
              <FcShipped size={32} />
              <p className="absolute -bottom-5 text-sm right-0">Delivered</p>
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
}
