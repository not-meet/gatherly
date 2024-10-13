"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HomeCardComponent from "./HomeCard";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isSheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  const createMeeting = () => {

  }
  const router = useRouter();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCardComponent
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleclick={() => setMeetingState('isInstantMeeting')}
        classname="bg-orange-1"
      />
      <HomeCardComponent
        img="/icons/schedule.svg"
        title="schedule Meeting"
        description="Plan your meeting meeting"
        handleclick={() => setMeetingState('isSheduleMeeting')}
        classname="bg-blue-1"
      />
      <HomeCardComponent
        img="/icons/recordings.svg"
        title="View Recordings"
        description="View saved recodrings"
        handleclick={() => { router.push('/recordings') }}
        classname="bg-yellow-1"
      />
      <HomeCardComponent
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="join meeting"
        handleclick={() => setMeetingState('isJoiningMeeting')}
        classname="bg-purple-1"
      />
      <MeetingModal isOpen={meetingState === 'isInstantMeeting'} onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting" className='text-center' buttonText='start Meeting' handleclick={createMeeting} />
    </section>
  )
}

export default MeetingTypeList;
