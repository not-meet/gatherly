import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HomeCardProps {
  classname: string,
  img: string,
  title: string,
  description: string,
  handleclick: () => void,
}

const HomeCardComponent = ({ classname, img, title, description, handleclick }: HomeCardProps) => {
  return (
    <div className={cn('bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', classname)} onClick={handleclick}>
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt={title} height={27} width={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>

  )
}

export default HomeCardComponent
