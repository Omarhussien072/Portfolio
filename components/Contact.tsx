'use client'

import { useRef, useState } from "react"
import SectionPanel from "./SectionPanel"
import { ContactRightArrowIcon } from "./SystemIcons"
import emailjs from '@emailjs/browser'

function Contact(){
    const form = useRef<HTMLFormElement>(null)
    const [messageState, setMessageState] = useState('')

    const sendEmail = (e: React.SubmitEvent) => {
        e.preventDefault()
        if(form.current){
        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!, form.current, process.env.NEXT_PUBLIC_EMAIL_KEY!
        ).then(
            (result) => {
                setMessageState('sent')
                setTimeout(() => {
                    setMessageState('')
                }, 2500);
            },
            (result) => {
                setMessageState('notSent')
            }
        )   
        form.current.reset()
    }
    }

    return (
        <SectionPanel id="contact" panelTitle="//contact" titleColor="text-amber-400">
            <div className="px-2 select-text">
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                    <div className="flex gap-3 flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-[0.8rem] text-muted-foreground/70 uppercase">Name</label>
                                <input id="name" name="user_name" type="text" className="border border-border/70 rounded-sm bg-muted/25 px-3 py-2.5 text-sm placeholder:text-muted-foreground/55  focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/15 transition-all duration-150 outline-none" required placeholder="Your name"/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-[0.8rem] text-muted-foreground/70 uppercase">Email</label>
                                <input id="email" name="user_email" type="email" className="border border-border/70 rounded-sm bg-muted/25 px-3 py-2.5 text-sm placeholder:text-muted-foreground/55  focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/15 transition-all duration-150 outline-none" required placeholder="you@example.com"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="message-area" className="text-[0.8rem] text-muted-foreground/70 uppercase">message</label>
                            <textarea id="message-area" name="message" className="border border-border/70 rounded-sm bg-muted/25 px-3 py-2.5 text-sm placeholder:text-muted-foreground/55  focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/15 transition-all duration-150 outline-none resize-none h-28" placeholder="Tell me about your project..." required></textarea>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
                            <span className="text-[0.8rem] text-muted-foreground/60 tracking-wide">response within 24h</span>
                            <button type="submit"  className="flex w-full sm:w-auto justify-center items-center gap-2 text-xs text-amber-400 bg-amber-400/8 hover:bg-amber-400/15 border border-amber-400/25 hover:border-amber-400/55 px-4 py-2 rounded-sm transition-all duration-150 cursor-pointer">
                                Send message <ContactRightArrowIcon className="size-3"/>
                            </button>
                        </div>
                    </div>
                </form>
                <div className="flex justify-end w-full">
                    {messageState === 'sent' ? (<span className="flex justify-end items-center w-full py-4 text-sm text-primary/70 ">Message has sent successfully!</span>) : messageState === 'notSent'? (<span className="flex justify-end items-center w-full py-4 text-sm text-red-400/70 ">Error sending the message. Please try again later.</span>) : (<span className="hidden"></span>)}
                    
                </div>
            </div>
        </SectionPanel>
    )
}

export default Contact