import React from "react";
import { useReactToPrint } from "react-to-print";

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

    const formatDate = (date: Date | string | null): string => {
        if (!date) return "";

        const dateObj = date instanceof Date ? date : new Date(date);

        return dateObj.toLocaleDateString("en-US", {
            month: 'short',
            year: 'numeric'
        });
    }

    return (
        <main style={{ backgroundColor: "#FFFF", color: "#000" }}>
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
                                {formData.experiences.map((exprience, index) => {
                                    const startDate = formatDate(exprience.startdate);
                                    const endDateDisplay = exprience.is_current ? "Present" : formatDate(exprience.enddate);
                                    const workDetailBullets = exprience.work_details 
                                            ? exprience.work_details.split("\n")
                                            .filter(detail => detail.trim() !== "")
                                            .map(detail => detail.replace(/^\s+|\s+$/g, "")) : [];

                                    return (
                                        <li key={index}>
                                            <p>{exprience.position}</p>
                                            <p>{exprience.employer}</p>
                                            <p>{exprience.employer_address}</p>
                                            <p>{startDate} - {endDateDisplay}</p>
                                            {workDetailBullets.length > 0 && (
                                                <ul className="list-disc pl-5">
                                                    {workDetailBullets.map((detail, detailsIndex) => (
                                                        <li key={detailsIndex}>{detail}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                        <section className="border border-red-500">
                            <h2>Education</h2>
                            <ul>
                                {formData.educations.map((education, index) => {
                                    const enrollDate = formatDate(education.enrolldate);
                                    const finishDate = formatDate(education.finishdate);

                                    return (
                                        <li key={index}>
                                            <p>{education.school_name}</p>
                                            <p>{education.school_address}</p>
                                            <p>{education.degree} in {education.field_of_study}</p>
                                            <p>{enrollDate} - {finishDate}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                    </div>
                </section>
            </div>
            <button className="btn bg-blue-400 p-3 rounded-lg" onClick={handlePrintButtonClick}>
                Print as PDF
            </button>
        </main>
    );
}
