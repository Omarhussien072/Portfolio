import { githubIcon, linkedInIcon, mailIcon, XIcon, frontendIcon, jobIcon } from "./SystemIcons";

export const utilityCommands = [
  { id: crypto.randomUUID(), command: "cd dir_name", description: "navigate to directory" },
  { id: crypto.randomUUID(), command: "clear", description: "clear viewport" },
  { id: crypto.randomUUID(), command: "help", description: "show commands" },
]

export const sectionsCommands = [
  { id: crypto.randomUUID(), command: "home", description: "main overview" },
  { id: crypto.randomUUID(), command: "about", description: "my bio" },
  { id: crypto.randomUUID(), command: "projects", description: "my work" },
  { id: crypto.randomUUID(), command: "contact", description: "hire me" },
]

export const achievements = [
  {id:crypto.randomUUID(), numberOfAchievements:'1+', achievementTitle:'years exp'},
  {id:crypto.randomUUID(), numberOfAchievements:'5+', achievementTitle: 'projects'},
]

export const enteredCommands:string[] = []

export const SectionsOrder = [
  'home', 'about', 'projects', 'contact'
]

interface socialLink{
  id: string,
  type: string,
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  link: string,
}

export const socialLinks: socialLink[]= [
  {id: crypto.randomUUID(),type: "github", Icon: githubIcon, link: "https://github.com/Omarhusien072"},
  {id: crypto.randomUUID(),type: "linkedIn", Icon: linkedInIcon, link: "https://www.linkedin.com/in/omar-husien-q421"},
  {id: crypto.randomUUID(),type: "twitter", Icon: XIcon, link: "https://www.x.com/omarhussien072"},
  {id: crypto.randomUUID(),type: "email", Icon: mailIcon, link: "omarhusien072@gmail.com"},
]

interface aboutCard{
  id:string,
  cardTitle: string,
  cardTechs: string[],
  CardIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>

}

export const aboutCards:aboutCard[]= [
  {id:crypto.randomUUID(), cardTitle:'frontend', cardTechs:['react','next.js','tailwind'], CardIcon:frontendIcon},
  {id:crypto.randomUUID(), cardTitle:'work style', cardTechs:['remote', 'onsite' , 'focused', 'fast learner'], CardIcon:jobIcon},
]

export const techSkills: string[] = [
  'html', 'css', 'vanilla js', 'angular', 'react', 'typeScript', 'node.js', 'tailwind', 'aI enginner', 'python'
]

interface projectDataType{
    projectId: string,
    projectTitle: string,
    projectDescription: string,
    projectState: string,
    projectTechs: string[],
    projectLiveLink: string,
    borderClass: string,
    stateClass: string,
}
  
export const projectData:projectDataType[] = [
  {
      projectId: crypto.randomUUID(),
      projectTitle: "TrustGate",
      projectDescription: "A Zero-Trust Network Access Control (NAC) system featuring active subnet discovery, Active Directory (LDAP) authentication, postural compliance scanning, dynamic gateway firewall enforcements, and a real-time monitoring web dashboard. Successfully delivered as a senior graduation project.",
      projectState: "completed",
      projectTechs: ['Python', 'Flask', 'PySide6 (Qt6)', 'SQLite', 'Server-Sent Events (SSE)', 'Chart.js'],
      projectLiveLink: "https://github.com/Omarhusien072/TrustGate.git",
      borderClass: "hover:border-cyan-400/25",
      stateClass: "border border-cyan-400/50 text-cyan-400",
  },
  {
    projectId: crypto.randomUUID(),
    projectTitle: "animeFav",
    projectDescription: "A REST API anime discovery portal that fetches real-time data, recommendations, and trailers from TMDB, featuring in-memory RxJS data caching, a persistent watchlist saved via browser storage, and a responsive Bootstrap-powered layout.",
    projectState: "in development",
    projectTechs: ['Angular', 'TypeScript', 'Bootstrap 5', 'RxJS', 'REST API', 'Local Storage'],
    projectLiveLink: "https://github.com/Omarhusien072/AnimeFav.git",
    borderClass: "hover:border-violet-400/25",
    stateClass: "border border-violet-400/50 text-violet-400",
  },
  {
    projectId: crypto.randomUUID(),
    projectTitle: "IB64C",
    projectDescription: "A multithreaded desktop application built with PySide6/Qt6 that recursively scans directories to convert images into base64 strings, exporting them into formatted, importable Python modules.",
    projectState: "completed",
    projectTechs: ['Python', 'PySide6 (Qt6)', 'Multi-threading', 'Base64'],
    projectLiveLink: "https://github.com/Omarhusien072/IB64C.git",
    borderClass: "hover:border-amber-400/25",
    stateClass: "border border-amber-400/50 text-amber-400",
  }
]


export const allCommands = [...sectionsCommands, ...utilityCommands]

const rightPanelTitles:string[] = ['commands', 'system logs']
export const RightPaneluppercaseTitles:string[] = rightPanelTitles.map((title) => {
        return title.toString().toUpperCase()
})

export interface LogEntry {
  id: string,
  type: 'success' | 'error' | 'warning' | 'info' | 'help',
  text: string,
}

export interface LogsEntry{
    logs: LogEntry[]
}

