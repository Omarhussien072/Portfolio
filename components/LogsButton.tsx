'use client'
import { useState } from 'react';
import { SystemLogsIcon } from './SystemIcons'
import LogsOverlay from './LogsOverlay';
import { LogsEntry, RightPaneluppercaseTitles } from './SharedData';


function LogsButton({logs}: LogsEntry){
    const [showOverlay, setShowOverlay] = useState(false)

    const onClose = () => {
        setShowOverlay(false)
    }

    return(
        <>
        <div className="fixed hidden md:block xl:hidden top-0 right-0 mr-0.5 sm:mr-2 md:mr-4 z-50">
            <button className="flex justify-between items-center bg-secondary-background gap-[0.05rem] md:gap-[0.2rem] p-1 md:px-2 md:py-2 mt-4 outline-none border 
            border-primary/30 cursor-pointer rounded-sm hover:border-primary/70 transition-all duration-300"
            onClick={() => {setShowOverlay(true)}}>
                <SystemLogsIcon className="size-4 text-primary"/>
                <span className='text-[1rem] text-muted-foreground/90'>log</span>
                {logs === undefined || logs.length !== 0 && <span className='text-[1rem] text-primary'>{logs.length > 99 ? '99+' : logs.length}</span>}
            </button>
        </div>

        {showOverlay && <LogsOverlay onClose={onClose} titles={RightPaneluppercaseTitles} logs={logs}/>}
        </>
    )

}

export default LogsButton;
