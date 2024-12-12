import React from "react";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useResumeStore } from "@/store/resume-store";

export function TemplateOne() {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef });

    const formData = useResumeStore((state) => state.formData);

    const capitalizeFirstLetter = (str: string) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const handlePrintButtonClick = () => {
        handlePrint();
    }

    return (
        <main>
            <div ref={contentRef}>
                <div className="flex justify-center items-center space-x-8">
                    <Avatar style={{ width: '120px', height: '120px' }}>
                        <AvatarImage width={120} height={120} />
                        <AvatarFallback className="bg-green-500" />
                    </Avatar>
                    <p className="text-3xl font-bold">
                        {capitalizeFirstLetter(formData.personalInfo.firstname)}&nbsp; 
                        {capitalizeFirstLetter(formData.personalInfo.middleinitial)}&nbsp; 
                        {capitalizeFirstLetter(formData.personalInfo.lastname)}
                    </p>
                </div>
                <section className="flex items-start">
                    <div>
                        <section className="border border-red-500">
                            <h2>Personal Information</h2>
                            <div>
                                <p>Email: {formData.personalInfo.email}</p>
                                <p>Contact Number: {formData.personalInfo.contact_number}</p>
                                <p>Address: {formData.personalInfo.municipality}, {formData.personalInfo.country} {formData.personalInfo.postalcode}</p>
                            </div>
                        </section>
                        <section className="border border-red-500">
                            <h2>Skills</h2>
                            <ul>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                            </ul>
                        </section>
                    </div>
                    <div className="flex-1">
                        <section className="border border-red-500">
                            <h2>Experiences</h2>
                            <ul>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                            </ul>
                        </section>
                        <section className="border border-red-500">
                            <h2>Education</h2>
                            <ul>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                                <li>TEST</li>
                            </ul>
                        </section>
                    </div>
                </section>
            </div>
            <Button className="btn" onClick={handlePrintButtonClick}>
                Print as PDF
            </Button>
        </main>
    );
}
