'use client'

import { projectData } from "./SharedData"
import ProjectCard from "./ProjectCard"
import SectionPanel from "./SectionPanel"


function Projects(){
    return (
        <SectionPanel panelTitle="//projects" titleColor="text-violet-400" id="projects">
            <div className="flex flex-col gap-4 max-h-130 overflow-y-auto">
                {projectData.map((project,index) => {
                    return <ProjectCard key={project.projectId} index={index + 1} projectTitle={project.projectTitle}
                            projectDescription={project.projectDescription} projectState={project.projectState} 
                            techUsed={project.projectTechs} liveLink={project.projectLiveLink}
                            borderClass={project.borderClass} stateClass={project.stateClass}/>
                })}
            </div>
        </SectionPanel>
    )
}

export default Projects