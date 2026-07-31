'use client'
import { KeyboardEvent, useRef, useState, useEffect } from "react"
import { enteredCommands, LogEntry, allCommands } from "./SharedData";
import { SystemLogsIcon } from "./SystemIcons";

interface TerminalProps {
    Directory: string,
    logs: LogEntry[],
    onCommandExecute: (command: string)=> void,
}

function Terminal({Directory, logs, onCommandExecute}: TerminalProps){
    const terminalRef = useRef<HTMLInputElement>(null)
    const historyIndex = useRef<number>(enteredCommands.length)
    const logsContainerRef = useRef<HTMLDivElement>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    // Auto scroll logs container when new logs are added or drawer opens
    useEffect(() => {
        if (isDrawerOpen && logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
        }
    }, [logs.length, isDrawerOpen])

    // Close drawer on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape' && isDrawerOpen) {
                setIsDrawerOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isDrawerOpen])

    const onSubmit = (e: React.FormEvent) => {
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
        <>
            {/* Backdrop to close drawer when clicking anywhere outside (Mobile & Tablet) */}
            {isDrawerOpen && (
                <div
                    onClick={() => setIsDrawerOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 xl:hidden transition-opacity"
                />
            )}

            <footer className="fixed bottom-0 inset-x-0 bg-background/96 backdrop-blur-sm px-3 md:px-8 py-2 md:py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-40">
                <div className="max-w-3xl mx-auto flex flex-col">
                    
                    {/* Header Toggle Button for Mobile & Tablet */}
                    <div className="flex justify-between items-center mb-1.5 xl:hidden">
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen((prev) => !prev)}
                            className="flex items-center gap-2 bg-card border border-primary/30 hover:border-primary/70 px-3 py-1 rounded-t-md transition-all duration-200 cursor-pointer text-foreground/90 shadow-lg"
                        >
                            <SystemLogsIcon className="size-3.5 text-primary animate-pulse" />
                            <span className="text-[0.7rem] font-medium tracking-wide text-primary">LOGS & COMMANDS</span>
                            {logs.length > 0 && (
                                <span className="bg-primary/20 text-primary text-[0.65rem] px-1.5 py-0.5 rounded-full font-bold">
                                    {logs.length > 99 ? '99+' : logs.length}
                                </span>
                            )}
                            <span className="text-muted-foreground/80 text-[0.65rem] ml-1">
                                {isDrawerOpen ? '▼' : '▲'}
                            </span>
                        </button>
                    </div>

                    {/* Expandable Drawer Content (Mobile & Tablet) */}
                    {isDrawerOpen && (
                        <div className="xl:hidden bg-card/95 border border-primary/25 border-b-0 rounded-t-md p-3 mb-2 animate-fade-in shadow-2xl transition-all duration-300 max-h-[55vh] overflow-y-auto flex flex-col gap-3">
                            {/* Quick Commands Bar */}
                            <div className="flex flex-col gap-1.5 border-b border-border/70 pb-2.5 shrink-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-[0.65rem] text-muted-foreground uppercase tracking-widest font-semibold">Available Commands (Tap to execute)</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsDrawerOpen(false)}
                                        className="text-xs text-muted-foreground hover:text-primary px-1.5 py-0.5 rounded cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-1">
                                    {allCommands.map((cmd) => (
                                        <button
                                            key={cmd.id}
                                            type="button"
                                            onClick={() => {
                                                if (terminalRef.current) {
                                                    if (cmd.command.includes("dir_name") || cmd.command.startsWith("cd ")) {
                                                        terminalRef.current.value = "cd ";
                                                        terminalRef.current.focus();
                                                    } else {
                                                        terminalRef.current.value = cmd.command;
                                                        onCommandExecute(cmd.command);
                                                        terminalRef.current.value = '';
                                                    }
                                                }
                                            }}
                                            className="text-[0.65rem] bg-secondary/90 hover:bg-primary/20 hover:border-primary/60 border border-border/80 px-2.5 py-1 rounded text-primary transition-colors cursor-pointer active:scale-95"
                                            title={cmd.description}
                                        >
                                            {cmd.command}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* System Logs Window */}
                            <div className="flex flex-col flex-1 min-h-16">
                                <span className="text-[0.65rem] text-muted-foreground uppercase tracking-widest font-semibold mb-1.5">System Logs</span>
                                <div ref={logsContainerRef} className="flex flex-col overflow-y-auto max-h-36 gap-1 pr-1 font-mono text-[0.65rem] bg-background/70 p-2.5 rounded border border-border/60">
                                    {logs.length === 0 ? (
                                        <span className="text-muted-foreground/50 italic text-[0.65rem]">no output yet — type or tap a command above</span>
                                    ) : (
                                        logs.map((log) => (
                                            <div key={log.id} className="leading-relaxed">
                                                {log.type === 'success' ? (
                                                    <span className="text-primary/90">{log.text}</span>
                                                ) : log.type === 'error' ? (
                                                    <span className="text-red-400/90">{log.text}</span>
                                                ) : log.type === 'warning' ? (
                                                    <span className="text-orange-400/90">{log.text}</span>
                                                ) : log.type === 'help' ? (
                                                    <span className="text-cyan-400/90">{log.text}</span>
                                                ) : (
                                                    <span className="text-muted-foreground/80">&gt; {log.text}</span>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                {/* Input Bar */}
                <div className="flex items-center gap-3 border border-primary/25 focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/15 rounded-sm px-3 md:px-4 py-2.5 md:py-3 bg-card/80 transition-all duration-150">
                    <span className="text-muted-foreground/90 text-xs shrink-0 hidden sm:block ">{Directory}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-primary w-3.5 h-3.5 shrink-0"><path d="m9 18 6-6-6-6"></path></svg>
                    <form onSubmit={onSubmit} className="relative flex w-full">
                        <input className="flex-1 bg-transparent outline-none text-[0.65rem] lg:text-[1rem] text-foreground placeholder:text-primary/70 caret-primary min-w-0" type="text" ref={terminalRef} onKeyDown={hanleKeyDown} placeholder="type 'home' to start  ·  or try 'help'" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} inputMode="text" enterKeyHint="go" />
                    </form>
                    <span className="text-muted-foreground/55 text-[0.7rem] shrink-0 hidden md:block tracking-wide">↑↓ history · enter</span>
                </div>

            </div>
        </footer>
        </>
    )
}

export default Terminal;