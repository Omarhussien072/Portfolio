'use client'
import { useEffect } from "react";
import { LogsEntry } from "./SharedData";


function SystemLogs({logs}: LogsEntry){
    const containerId = 'logs-container'
    useEffect(() => {
        const logsContainer = document.getElementById(containerId) 
        if(logsContainer){
            logsContainer.scrollTop = logsContainer.scrollHeight
        }
    }, [logs.length])
    return(
        <div id={containerId} className="flex flex-col overflow-y-auto overscroll-contain max-h-64">
            {logs.length === 0 ? (
                <div className="p-3">
                    <span className="text-muted-foreground/50 text-sm italic">no ouput yet</span>
                </div>
            ):(
                logs.map((log) => {
                    return <ul key={log.id} className="flex flex-col text-[0.7rem] px-4 py-1">
                        {log.type === 'success' ? (<li className='text-primary/85'>{log.text}</li>) : log.type === 'error'? (<li className='text-red-400/90'>{log.text}</li>) : log.type === 'warning'? (<li className='text-orange-400/85'>{log.text}</li>) : log.type === 'help'?  (<li className='text-cyan-400/85'>{log.text}</li>) : (<li className='text-muted-foreground/70'> {`>`} {log.text}</li>) }
                    </ul>
                })
            )}
        </div>
    )
}

export default SystemLogs;