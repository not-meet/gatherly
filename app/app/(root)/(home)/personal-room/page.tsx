"use client"
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useGetCallById } from "@/hooks/useGetCallsById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
const Table = ({ title, description }: { title: string; description: string; }) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-[32px]">{title}:</h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}:</h1>
    </div>
  )
}

const PersonalRoom = () => {
  const { toast } = useToast()
  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser()
  const meetingId = user?.id;
  const meetingLink = `gatherly-taupe.vercel.app/meeting/${meetingId}?personal=true`
  const { call } = useGetCallById(meetingId!)
  const startRoom = async () => {
    if (!client || !user) return;
    if (!call) {


      const newCall = client.call('default', meetingId!)

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  }

  return (
    <section className="flex size-full gap-10 flex-col text-white">
      <h1 className="text-3xl font-bold">
        Personal Room
      </h1>
      <div className="w-full flex flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting Id" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-purple-1" onClick={startRoom}>Start Meeting</Button>
        <Button className="bg-black hover:bg-orange-1" onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({
            title: "Link Copied",
          })
        }}>Copy link</Button>
      </div>
    </section>
  )
}


export default PersonalRoom;

