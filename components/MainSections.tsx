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
    const homeData = {
        id: crypto.randomUUID(),
        name: "omar hussien",
        jobTitle: "Junior Front-End Developer",
        jobDescription: "Frontend Developer building lightning-fast, responsive web applications powered by REST APIs. I focus on crafting seamless, zero-friction user experiences where every interaction feels natural and enjoyable."
    }
    const aboutData = {
        id: crypto.randomUUID(),
        bio: "Recent Information & Communication Technology (ICT) graduate specializing in Software Engineering, based in Egypt. I build high-performance, fully responsive web applications that consume REST APIs and leverage browser storage and caching for standalone client efficiency. My development philosophy centers on speed, adaptability, and detail-oriented UI design—ensuring users enjoy an intuitive, hassle-free experience without wasting time. Constantly keeping pace with modern web standards, I focus on practical problem-solving, clean code architecture, and delivering polished, production-ready software."
    }
    
    const sectionRegistery: Record<string, React.ReactNode> = {
        home: <Home name={homeData.name} jobTitle={homeData.jobTitle} jobDescription={homeData.jobDescription}/>,
        about: <About bio={aboutData.bio}/>,
        projects: <Projects/>,
        contact: <Contact/>,
    }
    return(
        <div className="flex flex-1 flex-col gap-4 justify-start items-center grow pb-32 pt-10">
            {currentSections.length === 0 ? (<SectionPlaceholder systemTitle={"system ready · v1.0.0"} helperTitle={"use the bar below to load sections"}/>)
            : (currentSections.map((section) => {
                return <div key={section} className="animate-fade-in-up w-full flex justify-center">
                    {sectionRegistery[section]}
                </div>
            }))}
        </div>
    )
}
export default MainSections;