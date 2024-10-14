"use client"

import { Button } from "@/components/ui/button";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {

  const [isMicToggeledOn, setIsMicToggeledOn] = useState(false);
  const call = useCall()

  if (!call) throw new Error("use call must be used within Stream call component");

  useEffect(() => {
    if (isMicToggeledOn) {
      call?.microphone.disable();
      call?.camera.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();

    }
  }, [isMicToggeledOn, call?.camera, call?.microphone])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3 text-white">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input type="checkbox" checked={isMicToggeledOn} onChange={(e) => {
            setIsMicToggeledOn(e.target.checked)
          }} />
          join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className="rounded-md bg-purple-1 hover:bg-purple-800 font-bold px-4 py-2.5" onClick={() => {
        call.join();
        setIsSetupComplete(true)
      }}>
        Join Meeting
      </Button>
    </div>
  )
}
export default MeetingSetup

