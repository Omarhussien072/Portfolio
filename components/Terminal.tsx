'use client'
import { KeyboardEvent, useRef } from "react"
import { enteredCommands, LogEntry } from "./SharedData";
import LogsButton from "./LogsButton";

interface TerminalProps {
    Directory: string,
    logs: LogEntry[],
    onCommandExecute: (command: string)=> void,
}

function Terminal({Directory, logs, onCommandExecute}: TerminalProps){
    const terminalRef = useRef<HTMLInputElement>(null)
    const historyIndex = useRef<number>(enteredCommands.length)
    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        const currentCommand = terminalRef.current?.value.trim().toLowerCase()
        if(currentCommand){
            onCommandExecute(currentCommand)
            if(terminalRef.current?.value){
                terminalRef.current.value = ''
                historyIndex.current = enteredCommands.length
            }
        }
    }
    const hanleKeyDown = (e:KeyboardEvent) => {
        if(!terminalRef.current || enteredCommands.length === 0) return
        
        if(terminalRef.current && enteredCommands.length > 0){
            switch(e.key){
                case 'ArrowUp':
                    e.preventDefault()
                    if(historyIndex.current > 0){
                        terminalRef.current.value = enteredCommands[historyIndex.current -= 1]
                    }
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    if(historyIndex.current < enteredCommands.length - 1){
                        terminalRef.current.value = enteredCommands[historyIndex.current += 1]
                    }
                    break
                }
            }
    }




    return (
        <footer className="fixed bottom-0 inset-x-0 bg-background/96 backdrop-blur-sm px-3 md:px-8 py-3 md:py-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 border border-primary/25 focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/15 rounded-sm px-3 md:px-4 py-2.5 md:py-3 bg-card/80 transition-all duration-150">
                    <span className="text-muted-foreground/90 text-xs shrink-0 hidden sm:block ">{Directory}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-primary w-3.5 h-3.5 shrink-0"><path d="m9 18 6-6-6-6"></path></svg>
                    <form onSubmit={onSubmit} className="relative flex  w-full">
                        <input className="flex-1 bg-transparent outline-none text-[0.65rem] lg:text-[1rem] text-foreground placeholder:text-primary/70 caret-primary min-w-0" type="text" ref={terminalRef} onKeyDown={hanleKeyDown}  placeholder="type 'home' to start  ·  or try 'help'" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}/>
                    </form>
                    <span className="text-muted-foreground/55 text-[0.7rem] shrink-0 hidden md:block tracking-wide">↑↓ history · enter</span>
                </div>

            </div>
        </footer>
    )
}

export default Terminal;