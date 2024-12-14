import React from "react";
import { generateContent } from "@/components/gemini-model";
import ReactMarkdown from "react-markdown";
import { ModeToggle } from "@/components/mode-toggle";

import { Button } from "@/components/ui/button";
import {
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function ChatBotContent() {
    const [userInput, setUserInput] = React.useState<string>("");
    const [response, setResponse] = React.useState<Array<{ type: string; message: string }>>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUserInput(e.target.value);
    }

    const handleClear = () => {
        setUserInput("");
        setResponse([]);
        setIsLoading(false);
    }

    const handleSubmit = async () => {
        if (!userInput.trim()) {
            setResponse([{ type: "system", message: "Please enter a prompt.." }]);
        }

        setIsLoading(true);
        try {
            const res = await generateContent(userInput);
            setResponse(prevResponse => [
                ...prevResponse,
                { type: "user", message: userInput },
                { type: "bot", message: res },
            ]);
            setUserInput("");
        } catch (error) {
            console.error("Error generating response:", error);
            setResponse(prevResponse => [
                ...prevResponse,
                { type: "system", message: "Failed to generate response" },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <>
            <SheetHeader>
                <section className="flex items-center justify-between p-4">
                    <SheetTitle>Hi! How can I assist you today?</SheetTitle>
                    <ModeToggle />
                </section>
            </SheetHeader>
            <div className="chat-container p-4">
                {response.length === 0 ? (
                    <h1>Got Questions? Paw's Got Answers 😊</h1> 
                ) : (
                    <div className="chat-history">
                    {response.map((msg, index) => (
                        <p key={index} className={`message ${msg.type}`}>
                        <ReactMarkdown>{msg.message}</ReactMarkdown>
                        </p>
                    ))}
                    {isLoading && <p className="loading-text">Generating response...</p>}
                    </div>
                )}

                <div className="input-container">
                    <Button onClick={handleClear} className="clear-btn">Clear</Button>

                    <Input
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message here..."
                        className="chat-input"
                    />

                    <Button onClick={handleSubmit} className="send-btn">
                        <Send />
                    </Button>
                </div>
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button type="button">Close</Button>
                </SheetClose>
            </SheetFooter>
        </>
    );
}