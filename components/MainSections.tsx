'use client'

import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Projects from "./Projects";
import SectionPlaceholder from "./SectionPlaceholder";


interface MainSectionsProps {
    currentSections: string[];
}

function MainSections({currentSections}: MainSectionsProps){
    const homeData = {id: crypto.randomUUID(), name: "omar hussien", jobTitle: "Junior Front-End Engineer", jobDescription: "I engineer fast, scalable web applications and desktop tools. Bridging the gap between robust system architecture and clean user interfaces."}
    const aboutData = {id: crypto.randomUUID(), bio: "I am a 4th-year Information Technology student, specializing in Software Engineering, and a Junior Front-End Developer based in Egypt. I focus on architecting scalable, performance-driven web applications and practical desktop utilities. My engineering approach bridges the gap between complex backend logic and seamless frontend experiences. I prioritize clean code principles, efficient state management, and building durable software solutions over relying on fleeting framework trends. With a strong foundation in system architecture and a meticulous eye for UI details, I thrive in environments that demand technical rigor, robust problem-solving, and continuous optimization."}
    
    const sectionRegistery: Record<string, React.ReactNode> = {
        home: <Home name={homeData.name} jobTitle={homeData.jobTitle} jobDescription={homeData.jobDescription}/>,
        about: <About bio={aboutData.bio}/>,
        projects: <Projects/>,
        contact: <Contact/>,
    }
    return(
        <div className="flex flex-1 flex-col gap-4 justify-start items-center grow pb-32 pt-10">
            {currentSections.length === 0 ? (<SectionPlaceholder systemTitle={"system ready · v1.0.0"} helperTitle={"use the bar below to load sections"}/>)
            : (currentSections.map((section, index) => {
                return <div key={section} className="animate-fade-in-up w-full flex justify-center">
                    {sectionRegistery[section]}
                </div>
            }))}
        </div>
    )
}
export default MainSections;