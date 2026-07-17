'use client'

import { Component } from "react"

interface AboutCardProps{
    cardTitle: string,
    cardTechs:string[],
    CardIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function AboutCard({cardTitle,cardTechs, CardIcon}: AboutCardProps){
    return (
            <div className="border border-border/40 hover:border-cyan-400 transition-colors duration-300 rounded-sm p-3">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <CardIcon className="text-cyan/60 size-4"/>
                        <span className={`text-muted-foreground/70 uppercase`}>{cardTitle}</span>
                    </div>
                    <div>
                        <span className="text-secondary-foreground/90 text-[0.8rem] capitalize">{cardTechs.join(' · ')}</span>
                    </div>
                </div>
            </div>
    )
}

export default AboutCard