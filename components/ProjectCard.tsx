'use client'
import { LiveLinkIcon } from "./SystemIcons"

interface ProjectCardProps{
    index:number
    projectTitle: string,
    projectDescription: string,
    projectState: string,
    techUsed: string[],
    liveLink: string
    borderClass: string,
    stateClass: string,
}

function ProjectCard({index, projectTitle, projectDescription, projectState, techUsed, liveLink, borderClass, stateClass}:ProjectCardProps){

    return (
        <div className={`w-full border border-border/40 rounded-sm ${borderClass} p-4 transition-all duration-150`}>
            <div className="flex justify-between items-start ">
                <div className="flex gap-2.5 items-center ">
                    <div>
                        <span className="text-muted-foreground/60 text-[0.7rem]">{index.toString().padStart(2,'0')}</span>
                    </div>
                    <span className="capitalize text-sm font-semibold">{projectTitle}</span>
                </div>
                <div className="flex justify-center items-center gap-2 shrink-0 ml-2">
                    <span className={`border ${stateClass} opacity-60 px-1 uppercase text-[0.6rem] tracking-widest`}>{projectState}</span>
                    <div>
                        <button><a href={liveLink} target="_blank"><LiveLinkIcon className="text-muted-foreground/70 hover:text-muted-foreground transition-colors duration-200 size-3 items-center cursor-pointer" /></a></button>
                    </div>
                </div>
            </div>
            <div className="text-foreground/75 text-xs leading-relaxed mb-3 font-semibold">
                {projectDescription}
            </div>
            <div className="flex flex-wrap gap-2 py-1">
                {techUsed.map((tech) => {
                    return <ul key={tech}>
                        <li className="px-2 py-[0.1rem] bg-border/50 text-[0.6rem] text-muted-foreground/80 hover:text-muted-foreground">{tech}</li>
                    </ul>
                })}
            </div>
        </div>
    )
}

export default ProjectCard;