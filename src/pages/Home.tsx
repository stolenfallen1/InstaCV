import React from "react";
import { useReactToPrint } from "react-to-print";

import { ResumeForms } from "@/components/forms";
import { ChatBotContent } from "./sub-pages/ChatBotContent";

import { BotMessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { TemplateOne } from "@/templates/template-one";
import { TemplateTwo } from "@/templates/template-two";
import { TemplateThree } from "@/templates/template-three";

export default function Home() {
    const [selectedTemplate, setSelectedTemplate] = React.useState<"templateOne" | "templateTwo" | "templateThree">("templateOne");
    const [isTemplateSheetOpen, setIsTemplateSheetOpen] = React.useState<boolean>(false);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef });

    const templates = {
        templateOne: <TemplateOne />,
        templateTwo: <TemplateTwo />,
        templateThree: <TemplateThree />,
    }
    
    const handleTemplateSelection = (template: keyof typeof templates) => {
        setSelectedTemplate(template);
        setIsTemplateSheetOpen(false);
    }

    return (
        <>
            <div className="w-1/2 p-4 border-r">
                <ResumeForms onPrint={handlePrint} />
            </div>

            <div className="w-1/2 p-4 bg-gray-100 dark:bg-neutral-950">
                <section className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold mb-4">Template Preview</h2>
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:text-sky-500"
                        onClick={() => setIsTemplateSheetOpen(true)}
                    >
                        <FileText size={16} />
                        Select Templates
                    </div>
                </section>
                <div className="bg-white shadow p-4 rounded">
                    {templates[selectedTemplate]}
                </div>
            </div>

            <Sheet open={isTemplateSheetOpen} onOpenChange={setIsTemplateSheetOpen}>
                <SheetContent side="bottom" className="h-[45vh] overflow-y-auto">
                    <div className="space-x-4">
                        {Object.keys(templates).map((templateKey) => (
                            <Button
                                key={templateKey}
                                onClick={() => handleTemplateSelection(templateKey as keyof typeof templates)}
                            >
                                {templateKey.replace('template', 'Template ')}
                            </Button>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            <Sheet>
                <SheetTrigger asChild>
                    <Button className="fixed bottom-8 right-8">
                        <BotMessageSquare />
                        Yow I'm Paw!
                    </Button>
                </SheetTrigger>
                <SheetContent style={{ maxWidth: '32.5vw' }}>
                    <ChatBotContent />
                </SheetContent>
            </Sheet>

            <div style={{ display: "none" }}>
                <div ref={contentRef}>
                    {templates[selectedTemplate]}
                </div>
            </div>
        </>
    );
}
