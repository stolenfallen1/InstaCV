import { ResumeForms } from "@/components/forms";
import { TemplateOne } from "@/templates/template-one";
import { ChatBotContent } from "./sub-pages/ChatBotContent";

import { BotMessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
    return (
        <>
            <div className="w-1/2 p-4 border-r">
                <ResumeForms />
            </div>

            <div className="w-1/2 p-4 bg-gray-100 dark:bg-neutral-950">
                <h2 className="text-xl font-semibold mb-4">Template Preview</h2>
                <div className="bg-white shadow p-4 rounded">
                    <TemplateOne />
                </div>
            </div>

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
        </>
    );
}
