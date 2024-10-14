import CallList from "@/app/components/CallList";
import React from "react";

const Previous = () => {
  return (
    <section className="flex size-full gap-10 flex-col text-white">
      <h1 className="text-3xl font-bold">
        Previous
      </h1>
      <CallList type="ended" />
    </section>

  )
}

export default Previous;

