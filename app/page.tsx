"use client";
import RightSidePanel from "@/components/RightSidePanels";
import Terminal from "../components/Terminal";
import MainSections from "@/components/MainSections";
import {
  LogEntry,
  sectionsCommands,
  SectionsOrder,
  utilityCommands,
  enteredCommands,
} from "@/components/SharedData";
import { useState } from "react";

function Home() {
  const defaultDirectory = "~/portfolio";
  const [directoryVal, setDirectoryVal] = useState<string>(defaultDirectory);
  const [currentSections, setCurrentSections] = useState<string[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([])
  const orderedSections = [...currentSections].sort((a, b) => {
    return SectionsOrder.indexOf(a) - SectionsOrder.indexOf(b);
  });

  const onCommandExecute = (command: string): boolean => {
    const cmd = command.trim().toLowerCase();
    if (!(enteredCommands.includes(cmd))) {
      enteredCommands.push(cmd);
    }
    if (
      sectionsCommands.some((sectionCommand) => sectionCommand.command === cmd)
    ) {
      if(cmd === 'all'){
        if(currentSections.length === 4){
          setLogs((prevLogs) => [...prevLogs,{ id: crypto.randomUUID(), type: "info", text: `${command}` },])
          setTimeout(() => {
            setLogs((prevLogs) => [...prevLogs, {id: crypto.randomUUID(),type: "warning",text: `sys: [warn] module //${command} is already active.`},]);
          }, 200);
          return true
        }

        if(currentSections.length > 0 && currentSections.length < 5){
          const missingSections = SectionsOrder.filter((section) => !currentSections.includes(section))
          setCurrentSections((prevSections) => [...prevSections, ...missingSections])
          setLogs((prevLogs) => [...prevLogs,{ id: crypto.randomUUID(), type: "info", text: `${command}`},])
          setTimeout(() => {
            setLogs((prevLogs) => [...prevLogs,{ id: crypto.randomUUID(), type: "info", text: 'core: [OK] rest of the modules are rendered successfully.'},])
          }, 200);
          return true
        }
        setCurrentSections(['home', 'about', 'projects', 'contact'])
        setDirectoryVal(`${defaultDirectory}/`);
        setLogs((prevLogs) => [...prevLogs,{ id: crypto.randomUUID(), type: "info", text: `${command}` },])
        setTimeout(() => {
          setLogs((prevLogs) => [...prevLogs,{ id: crypto.randomUUID(), type: "info", text: 'core: [OK] all modules are rendered successfully.' },])
        }, 200);
        return true
      }
      if (!currentSections.includes(cmd)) {
        setCurrentSections((prevSections) => [...prevSections, command]);

        setTimeout(() => {
          const sectionRef = document.getElementById(cmd);
          sectionRef?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);

        setDirectoryVal(`${defaultDirectory}/${command}`);

        setLogs((prevLogs) => [
          ...prevLogs,
          { id: crypto.randomUUID(), type: "info", text: `${command}` },
        ]);

        setTimeout(() => {
          setLogs((prevLogs) => [
            ...prevLogs,
            {
              id: crypto.randomUUID(),
              type: "success",
              text: `core: [OK] //${command} rendered successfully.`,
            },
          ]);
        }, 200);
        return true;
      } else {
        const sectionRef = document.getElementById(cmd);
        sectionRef?.scrollIntoView({ behavior: "smooth", block: "start" });
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            id: crypto.randomUUID(),
            type: "warning",
            text: `sys: [warn] module //${command} is already active.`,
          },
        ]);
        return true;
      }
    } else if (
      utilityCommands.some(
        (utilityCommand) => utilityCommand.command == cmd && cmd == "clear",
      )
    ) {
      setCurrentSections([]);
      setLogs([]);
      setDirectoryVal(defaultDirectory);
      return true;
    } else if (
      utilityCommands.some(
        (utilityCommand) => utilityCommand.command == cmd && cmd == "help",
      )
    ) {
      setLogs((prevLogs) => [
        ...prevLogs,
        { id: crypto.randomUUID(), type: "info", text: `${command}` },
      ]);

      setTimeout(() => {
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            id: crypto.randomUUID(),
            type: "help",
            text: `sh: available modules : ${sectionsCommands.map((sectionCommand) => sectionCommand.command).join(", ")}`,
          },
        ]);
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            id: crypto.randomUUID(),
            type: "help",
            text: "sh: navigation: cd <module_name>",
          },
        ]);
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            id: crypto.randomUUID(),
            type: "help",
            text: "sh: reset terminal: clear",
          },
        ]);
      }, 300);
      return false;
    } else if (cmd.startsWith("cd ")) {
      const targetSection = cmd.split(" ")[1];
      const sectionRef = document.getElementById(targetSection);

      if (!targetSection || !orderedSections.includes(targetSection)) {
        setLogs((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "error",
            text: `cd: no such file or directory: ${targetSection}`,
          },
        ]);
        setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: "help",
              text: `sys: [notice] load the module first by typing its name.`,
            },
          ]);
        }, 200);
        return false;
      }

      sectionRef?.scrollIntoView({ behavior: "smooth", block: "start" });
      setDirectoryVal(`${defaultDirectory}/${targetSection}`);

      setLogs((prev) => [
        ...prev,
        { id: crypto.randomUUID(), type: "info", text: `${command}` },
      ]);

      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "success",
            text: `fs: successfully changed directory to ~/${targetSection}`,
          },
        ]);
      }, 200);
      return true;
    } else if (cmd === "cd") {
      const sectionRef = document.getElementById('home');
      if (orderedSections.includes('home')) {
        sectionRef?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        setLogs((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "info", text: `${command}` },
        ]);
        setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: "success",
              text: `fs: returned to root directory (~/home)`,
            },
          ]);
        }, 200);
        return true;
      } else {
        setLogs((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: "info", text: `${command}` },
          {
            id: crypto.randomUUID(),
            type: "error",
            text: `cd: home module is not loaded yet`,
          },
        ]);
        return false;
      }
    } else {
      setLogs((prevLogs) => [
        ...prevLogs,
        { id: crypto.randomUUID(), type: "info", text: `${command}` },
        {
          id: crypto.randomUUID(),
          type: "error",
          text: `bash: ${cmd}: command not found`,
        },
      ]);
      return false;
    }
  };

  return (
    <main className="flex flex-col min-h-dvh w-full p-4 font-mono pb-24 md:pb-28">
      <RightSidePanel logs={logs} />
      <MainSections currentSections={orderedSections} />
      <Terminal Directory={directoryVal} onCommandExecute={onCommandExecute} logs={logs} />
    </main>
  );
}

export default Home;
