'use client'

import CommandsList from "./CommandsList";
import LogsButton from "./LogsButton";
import PanelBox from "./PanelBox";
import SystemLogs from "./SystemLogs";
import {LogsEntry, RightPaneluppercaseTitles} from './SharedData'


function RightSidePanel({logs} : LogsEntry){
    return(
        <aside>
            <div className="hidden xl:block fixed top-0 right-0 w-80 max-w-80 z-1">
            <PanelBox title={RightPaneluppercaseTitles[0]}>
                <CommandsList/>
            </PanelBox>
            <PanelBox title={RightPaneluppercaseTitles[1]} logsCount={logs.length} customTitleStyle="border-b border-border/70">
                <SystemLogs logs={logs}/>
            </PanelBox>
            </div>
            <div>
                <LogsButton logs={logs}/>
            </div>  
        </aside>
    )
}

export default RightSidePanel;