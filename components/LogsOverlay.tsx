'use client'
import { SystemLogsIcon } from './SystemIcons'
import {allCommands, LogEntry} from './SharedData'
import { useEffect } from 'react'

interface ParentProps{
    onClose: () => void,
    titles: string[],
    logs: LogEntry[],
}

function LogsOverlay({onClose, titles , logs}: ParentProps){
        const containerId = 'logsOverlay-container'
        useEffect(() => {
            const logsContainer = document.getElementById(containerId) 
            if(logsContainer){
                logsContainer.scrollTo({
                    top:logsContainer.scrollHeight,
                    behavior: 'smooth'
                })
            }
        }, [logs])

        useEffect(() => {
            const mediaQuery = window.matchMedia('(min-width: 1280px)')

            const handleMediaQueryChange = (e: MediaQueryListEvent | MediaQueryList) => {
                if(e.matches){
                    onClose()
                }
            }

            handleMediaQueryChange(mediaQuery)
            mediaQuery.addEventListener('change', handleMediaQueryChange)
            return () => mediaQuery.removeEventListener('change',handleMediaQueryChange)
        },[onClose])
    return (
        <div onClick={onClose} className="fixed shrink justify-end flex flex-col  backdrop-blur-[0.2rem] inset-0 p-4 z-50 bg-popover/10  animate-fade-in">
            <div className='flex flex-col animate-logs-translate-up overflow-y-auto overscroll-contain'>
                <div className="bg-card p-2 md:p-3 xl:p-4 border border-b-0 border-border" onClick={(e) => {e.stopPropagation()}}>
                    <div className="flex justify-between ">
                        <div className='flex justify-center items-center gap-1'>
                            <SystemLogsIcon className=' text-primary size-[0.7rem] md:size-[0.8rem] lg:size'/>
                            <span className='text-muted-foreground tracking-[0.2rem] text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]'>{titles[1]}</span>
                            {logs.length !== 0 && <span className='text-muted-foreground text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-[0.9rem]'>{logs.length}</span>}
                        </div>
                        <button onClick={onClose} className='text-md lg:text-lg text-primary/30 hover:text-primary/90 transition-all duration-300 cursor-pointer p-[0.4rem]'>x</button>
                    </div>
                </div>
                <div className="hidden lg:block w-full min-h-17 bg-card px-4 py-1 border border-b-0 border-border" onClick={(e) => {e.stopPropagation()}}>
                    <span className='text-[0.6rem] lg:text-[0.7rem] text-muted-foreground/50 tracking-widest '>{titles[0]}</span>
                    <div className='flex flex-col gap-4 justify-start lg:flex-row'>
                        {allCommands.map((command) => {
                            return <span key={command.id} className='text-primary text-[0.6rem] lg:text-[0.7rem]'>{command.command} <span className='text-muted-foreground'> - {command.description}</span></span>
                        })}
                    </div>
                </div>
                <div id={containerId} className="flex flex-col w-full bg-card px-4  border border-border max-h-70 overflow-y-auto overscroll-contain" onClick={(e) => {e.stopPropagation()}}>
                    <div className="py-2">
                        {logs.length === 0 ? (<span className='text-muted-foreground/50 text-[0.5rem] md:text-[0.7rem] italic'>no output yet — run a command first</span>)
                        : (logs.map((log) => {
                            return <ul key={log.id} className='flex text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] xl:text-[0.8rem] py-1'>
                        {log.type === 'success' ? (<li className='text-primary/85'>{log.text}</li>) : log.type === 'error'? (<li className='text-red-400/90'>{log.text}</li>) : log.type === 'warning'? (<li className='text-orange-400/85'>{log.text}</li>) : log.type === 'help'?  (<li className='text-cyan-400/85'>{log.text}</li>) : (<li className='text-muted-foreground/70'> {`>`} {log.text}</li>) }
                            </ul>
                        }))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogsOverlay;