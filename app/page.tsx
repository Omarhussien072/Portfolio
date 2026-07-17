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

  const onCommandExecute = (command: string) => {
    const cmd = command.trim().toLowerCase();
    if(!(enteredCommands.includes(cmd))){
      enteredCommands.push(cmd)
    }
    console.log(enteredCommands)
    if (
      sectionsCommands.some((sectionCommand) => sectionCommand.command === cmd)
    ) {
      if (!currentSections.includes(cmd)) {
        setCurrentSections((prevSections) => [...prevSections, command]);

        setTimeout(() => {
          const sectionRef = document.getElementById(cmd);
          sectionRef?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);

        setDirectoryVal(`${defaultDirectory}/${command}`);

        // تعديل النص ليكون بسيط ومريح للعين
        setLogs((prevLogs) => [
          ...prevLogs,
          { id: crypto.randomUUID(), type: "info", text: `${command}` },
        ]);

        setTimeout(() => {
          // تعديل رسالة النجاح
          setLogs((prevLogs) => [
            ...prevLogs,
            {
              id: crypto.randomUUID(),
              type: "success",
              text: `core: [OK] //${command} rendered successfully.`,
            },
          ]);
        }, 200);
        return;
      } else {
        // تعديل رسالة التحذير
        setLogs((prevLogs) => [
          ...prevLogs,
          {
            id: crypto.randomUUID(),
            type: "warning",
            text: `sys: [warn] module //${command} is already active.`,
          },
        ]);
        return;
      }
    } else if (
      utilityCommands.some(
        (utilityCommand) => utilityCommand.command == cmd && cmd == "clear",
      )
    ) {
      setCurrentSections([]);
      setLogs([]);
      setDirectoryVal(defaultDirectory);
      return;
    } else if (
      utilityCommands.some(
        (utilityCommand) => utilityCommand.command == cmd && cmd == "help",
      )
    ) {
      // تعديل طباعة الأمر
      setLogs((prevLogs) => [
        ...prevLogs,
        { id: crypto.randomUUID(), type: "info", text: `${command}` },
      ]);

      setTimeout(() => {
        // تنسيق رسائل المساعدة لتكون زي لينكس
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
      return;
    } else if (cmd.startsWith("cd ")) {
      const targetSection = cmd.split(" ")[1];
      const sectionRef = document.getElementById(targetSection);

      if (!targetSection || !orderedSections.includes(targetSection)) {
        // تعديل رسائل الخطأ والتنبيه
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
        return;
      }

      sectionRef?.scrollIntoView({ behavior: "smooth", block: "start" });
      console.log(sectionRef);
      setDirectoryVal(`${defaultDirectory}/${targetSection}`);

      // تعديل طباعة الأمر
      setLogs((prev) => [
        ...prev,
        { id: crypto.randomUUID(), type: "info", text: `${command}` },
      ]);

      setTimeout(() => {
        // تعديل رسالة النجاح للـ CD
        setLogs((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "success",
            text: `fs: successfully changed directory to ~/${targetSection}`,
          },
        ]);
      }, 200);
      return;
    } else if (cmd === "cd") {
      // ضفتلك طباعة الأمر قبل رسالة الخطأ عشان الـ History يكون سليم
      const sectionRef = document.getElementById('home')
      setLogs((prev) => [
        ...prev,
        { id: crypto.randomUUID(), type: "info", text: `${command}` },
      ]);
      
      sectionRef?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      setTimeout(() => {
        // تعديل رسالة النجاح للـ CD
        setLogs((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "success",
            text: `fs: returned to root directory (~/home)`,
          },
        ]);
      }, 200);
      return;
    } else {
      // ضفتلك طباعة الأمر قبل رسالة الخطأ عشان الـ History يكون سليم
      setLogs((prevLogs) => [
        ...prevLogs,
        { id: crypto.randomUUID(), type: "info", text: `${command}` },
        {
          id: crypto.randomUUID(),
          type: "error",
          text: `bash: ${cmd}: command not found`,
        },
      ]);
      return;
    }
  };

  return (
    <main className="flex flex-col h-screen w-full p-4 font-mono">
      <RightSidePanel logs={logs} />
      <MainSections currentSections={orderedSections} />
      <Terminal Directory={directoryVal} onCommandExecute={onCommandExecute} logs={logs} />
    </main>
  );
}

export default Home;
