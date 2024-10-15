"use client"
import ReactDatePicker from 'react-datepicker'
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import HomeCardComponent from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Input } from '@/components/ui/input';

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
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

      {!callDetails ? (
        <MeetingModal isOpen={meetingState === 'isSheduleMeeting'} onClose={() => setMeetingState(undefined)}
          title="Create Meeting" handleclick={createMeeting}>
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2 ">Add a description</label>
            <Textarea className="border-none bg-dark-3 focus-visible:ring-0 text-black bg-slate-200 focus-visible:ring-offset-0" onChange={(e) => {
              setValues({ ...values, description: e.target.value })
            }} />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">Select date and Time</label>
            <ReactDatePicker selected={values.datetTime} onChange={(date) => setValues({ ...values, datetTime: date! })} showTimeSelect timeFormat='HH:mm' timeIntervals={15} timeCaption='time' dateFormat="MMM d, yyyy h:mm aa" className='w-full text-black rounded bg-dark-3 p-2 focus:outline-none' />
          </div>
        </MeetingModal>

      ) : (
        <MeetingModal isOpen={meetingState === 'isSheduleMeeting'} onClose={() => setMeetingState(undefined)}
          title="Meeting Created" className='text-center' handleclick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'link copied' })
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />

      )}

      <MeetingModal isOpen={meetingState === 'isInstantMeeting'} onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting" className='text-center' buttonText='start Meeting' handleclick={createMeeting} />

      <MeetingModal isOpen={meetingState === 'isJoiningMeeting'} onClose={() => setMeetingState(undefined)}
        title="Type the link here" className='text-center' buttonText='start Meeting' handleclick={() => router.push(values.link)}>
        <Input className='border-none focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e) => setValues({ ...values, link: e.target.value })} placeholder='Meeting link' />
      </MeetingModal>

    </section>
  )
}

export default MeetingTypeList;
