import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { Button } from "@/components/ui/button";


interface MeetingProps {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  className?: string,
  children?: ReactNode,
  handleclick?: () => void,
  buttonText?: string,
  image?: string,
  buttonIcon?: string,
}
const MeetingModal = ({ isOpen, onClose, title, className, children, handleclick, buttonText, image, buttonIcon }: MeetingProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col bg-dark-1 gap-6 border-none px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} width={72} alt={title} height={72} />
            </div>
          )}
          <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
          {children}
          <Button className="bg-purple-1 hover:bg-violet-800 text-lg focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleclick}>
            {buttonIcon && (
              <Image src={buttonIcon} alt="button" width={13} height={13} />
            )}&nbsp;
            {buttonText || "Shedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
