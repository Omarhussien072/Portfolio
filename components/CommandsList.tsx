"use client";
import {allCommands} from './SharedData'

function CommandsList() {
  
  return (
    <div className="flex flex-col justify-between gap-2 p-4 text-sm">
      {allCommands.map((command) => {
        return (
          <dl key={command.id} className="flex justify-between">
            <dt className="text-primary">{command.command}</dt>
            <dd className="text-muted-foreground/70">{command.description}</dd>
          </dl>
        );
      })}

    </div>
  );
}

export default CommandsList;
