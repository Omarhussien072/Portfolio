'use client'

import { aboutCards, techSkills } from "./SharedData"
import SectionPanel from "./SectionPanel"
import AboutCard from "./AboutCard"


interface aboutProps{
    bio: string,
}

function About({bio}:aboutProps){
    return(
        <SectionPanel id="about" titleColor="text-cyan-400" panelTitle="//about">
            <div className="flex flex-col gap-6">
                <div>
                    <p className="text-foreground/85 text-sm leading-relaxed">{bio}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="uppercase text-muted-foreground/70 tracking-[0.2rem]">tech skills</span>
                    <div>
                        <div className="flex flex-wrap gap-2">{techSkills.map((skill) => {
                            return <ul key={skill}>
                                <li className="capitalize text-[0.8rem] text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-300 border border-border py-1 px-2 rounded-sm">{skill}</li>
                            </ul>
                        })}</div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 ">
                        {aboutCards.map((card) => {
                            return <AboutCard key={card.id} cardTitle={card.cardTitle} cardTechs={card.cardTechs} CardIcon={card.CardIcon}/>
                        })}
                    </div>
                </div>
            </div>
        </SectionPanel>
    )
}

export default About