import CallList from "@/app/components/CallList";
import React from "react";

const Recordings = () => {
  return (
    <section className="flex size-full gap-10 flex-col text-white">
      <h1 className="text-3xl font-bold">
        Recordings
      </h1>
      <CallList type="recordings" />
    </section>

  )
}

export default Recordings;

