import { cn } from "@/lib/utils";
import Loader from "./Loader";
import { LayoutList, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import { useRouter } from 'next/navigation'

type CallLayoutType = 'grid' | 'speakerLeft' | 'speakerRight';


const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setLayout] = useState<CallLayoutType>('speakerLeft')
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();
  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speakerLeft":
        return <SpeakerLayout participantsBarPosition="right" />
      default:
        return <SpeakerLayout participantsBarPosition="left" />
    }
  }
  return (

    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className=" flex-wrap fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push('/')} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"><LayoutList size={20} className="text-white" /></DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-2 text-white hover:bg-dark-1">
            {['grid', 'speakerRight', 'speakerLeft'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem className="cursor-pointer" onClick={() => { setLayout(item.toLowerCase() as CallLayoutType) }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <User size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}
export default MeetingRoom


