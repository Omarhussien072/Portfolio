'use client'
interface PanelBoxProbs{
    title: string,
    logsCount?: number,
    customTitleStyle?:string,
    children: React.ReactNode,
}

function PanelBox({title,logsCount,customTitleStyle, children}: PanelBoxProbs){
    return(
        <div className="border border-border/70 rounded-sm bg-sidebar text-sm text-muted-foreground/70 mt-4">
            <div className={`flex justify-between px-4 py-2 tracking-[0.3rem] ${customTitleStyle}`}>
                <h3>{title}</h3>
            { logsCount !== 0 && (<span className="text-sm text-muted-foreground/50">
                {logsCount}</span>
            )}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default PanelBox;