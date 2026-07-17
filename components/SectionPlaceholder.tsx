'use client'
interface SectionPlaceholderProps{
    systemTitle: string,
    helperTitle: string,
}

function SectionPlaceholder({systemTitle, helperTitle} : SectionPlaceholderProps){
    return(
        <div className="flex flex-1 flex-col justify-center items-center gap-5 md:gap-7 lg:gap-8  md:max-h-screen lg:max-h-screen">
            <span className="text-muted-foreground/70 tracking-[0.3rem] text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] font-bold">{systemTitle.toUpperCase()}</span>
            <div className="w-3 h-5 lg:w-4 lg:h-6 bg-primary animate-custom-pulse"></div>
            <p className="text-muted-foreground/80 text-[0.75rem] md:text-[0.8rem] lg:text-[1.1rem]">{helperTitle}</p>
        </div>
    )
}

export default SectionPlaceholder;