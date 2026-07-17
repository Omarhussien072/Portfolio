'use client'

import { SystemLogsIcon } from "./SystemIcons"

interface SectionPanelProps{
    children: React.ReactNode,
    panelTitle: string,
    titleColor: string,
    id: string,
}

function SectionPanel({children, panelTitle, titleColor, id}: SectionPanelProps){
    const currentTime: string = new Date().toLocaleTimeString()
    return (
        <div id={id} className="border border-border/70 flex flex-col gap-1 overflow-y-auto w-80 md:w-lg lg:w-2xl max-w-2xl">
            <header className="flex justify-between flex-auto bg-secondary-background border-b border-border px-2 py-1">
                <div className="flex items-center flex-auto gap-2">
                    <SystemLogsIcon className={`size-2 sm:size-[0.6rem] lg:size-[0.7rem] ${titleColor}`}/>
                    <span className={`${titleColor} text-[0.6rem] lg-text-[0.7rem] xl:text-[0.8rem]`}>{panelTitle}</span>
                </div>
                <span className="text-muted-foreground/60 text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]">{currentTime}</span>
            </header>
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}

export default SectionPanel