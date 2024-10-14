"use client"
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import HomeCardComponent from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isSheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    datetTime: new Date(),
    description: '',
    link: '',
  })

  const [callDetails, setCallDetails] = useState<Call>()
  const { toast } = useToast();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {

      if (!values.datetTime) {
        toast({ title: "Please select date and time" })
        return
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error("connecting the call failed");

      const startsAt = values.datetTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      })

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast({ title: "Meeting created!" });

    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create Meeting",
      })
    }
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
