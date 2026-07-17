'use client'

import { socialLinks, achievements } from "./SharedData"
import SectionPanel from "./SectionPanel"
import Achievements from "./Achievements"
interface HomeProps{
    name: string,
    jobTitle: string,
    jobDescription: string,
}
function Home({name, jobTitle, jobDescription}: HomeProps){
    return (
        <SectionPanel id="home" titleColor="text-primary" panelTitle="//home">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="flex flex-col justify-end h-2 max-h-2">
                        <div className="h-[0.35rem] w-[0.35rem] bg-primary rounded-[7rem] animate-pulse"></div>
                    </div>
                    <span className="text-muted-foreground/70 text-[0.7rem] tracking-[0.3rem]">{'open to work'.toUpperCase()}</span>
                </div>
                <div className="flex flex-col gap-2  pb-4 mb-4">
                    <div className="flex flex-col ">
                        <h1 className="text-[1rem] md:text-[1.5rem] lg:text-[2rem] capitalize">{name}</h1>
                        <span className="text-primary/80 text-[0.7rem] lg:text-[1rem]">{jobTitle}</span>
                    </div>
                    <div className="flex text-sm lg-xl my-3 max-w-103">
                        <p className="text-secondary-foreground/90">{jobDescription}</p>
                    </div>
                    <div className="flex flex-wrap xl:justify-start gap-2 overflow-y-auto">
                        {Object.values(socialLinks).map((link) => {
                            const LinkIcon = link.Icon
                            return (<ul key={link.id}>
                                <li><a href={link.type === 'email'? `mailto:${link.link}`: link.link} target={link.type === 'email'? '_self': '_blank'} className="flex gap-1 w-25 max-w-25 justify-center items-center text-sm border border-border px-2 py-1 text-muted-foreground/90 hover:text-primary/80 hover:border-primary/80 transition-all duration-300 capitalize ">
                                        <LinkIcon className="size-3 inline"/>
                                        {link.type}
                                    </a>    
                                </li>
                            </ul>
                        )})}
                    </div>
                </div>
                <div className="flex flex-wrap gap-8 pt-3 border-t border-border w-full">
                        {achievements.map((achievement) => {
                            return <Achievements key={achievement.id} numberOfAchievement={achievement.numberOfAchievements} achievementTitle={achievement.achievementTitle}/>
                        })}
                </div>
            </div>
        </SectionPanel>
    )
}


export default Home