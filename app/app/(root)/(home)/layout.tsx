import React, { ReactNode } from "react";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex max-md:pb-14 sm:px-14 min-h-screen flex-1 flex-col px-6 pb-6 pt-28">
          <div className="w-full">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

export default HomeLayout;

