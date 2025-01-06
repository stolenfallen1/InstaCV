import React from "react";
import { useResumeStore } from "@/store/resume-store";
import { formatDate, capitalizeFirstLetter, capitalizeEachWord } from "@/utils/formatter";

const styles = `
@media print {
    * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    .print-container {
        padding: 20px !important;
        display: block;
    }

    /* Two Column Layout (for print) */
    .two-column-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        width: 100%;
        overflow-wrap: break-word; 
        word-wrap: break-word; 
    }

    .column {
        width: 100%;
        overflow: hidden; 
        word-break: break-word; 
    }

    /* Prevent section breaks inside */
    header, section {
        page-break-inside: avoid;
    }

    /* Keep header, summary, and image together on the first page */
    .flex-wrapper {
        display: flex;
        flex-wrap: nowrap;
    }
}

/* Styles for screen display (non-printing) */
@media screen {
    .two-column-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        width: 100%;
        overflow-wrap: break-word; 
        word-wrap: break-word; 
    }

    .column {
        width: 100%;
        overflow: hidden; /* Prevent content overflow */
        word-break: break-word; /* Ensure words break within the column */
    }

    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .scrollable-container {
        max-height: 85vh;
        overflow-y: auto;
    }
}
`;

export function TemplateOne() {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const formData = useResumeStore((state) => state.formData);

    return (
        <main style={{ backgroundColor: "#FFFF", color: "#000" }} className="print-container">
            <style>{styles}</style>
            <div ref={contentRef} className="scrollable-container">
                <header className="flex justify-center items-center space-x-8">
                    {formData.personalInfo.picture && (
                        <div className="image-container">
                            <img 
                                src={formData.personalInfo.picture} 
                                alt="User Profile" 
                                className="w-20 h-20 rounded-full object-cover" 
                            />
                        </div>
                    )}
                    <p className="text-4xl font-bold">
                        {capitalizeFirstLetter(formData.personalInfo.firstname)}&nbsp; 
                        {capitalizeFirstLetter(formData.personalInfo.middleinitial)}&nbsp; 
                        {capitalizeFirstLetter(formData.personalInfo.lastname)}
                    </p>
                </header>

                <section className="mb-4">
                    <h2 className="font-bold border-b border-neutral-400">Summary</h2>
                    <p className="text-justify">{formData.summary}</p>
                </section>

                {/* Two Column Layout */}
                <div className="two-column-layout">
                    {/* Left Column */}
                    <div className="column">
                        <section className="mb-4">
                            <h2 className="font-bold border-b border-neutral-400">Personal Information</h2>
                            <div>
                                <p>Email: {formData.personalInfo.email}</p>
                                <p>Contact Number: {formData.personalInfo.contact_number}</p>
                                <p>Address: {capitalizeEachWord(formData.personalInfo.municipality)}, {capitalizeEachWord(formData.personalInfo.country)} {formData.personalInfo.postalcode}</p>
                            </div>
                        </section>

                        <section className="mb-4">
                            <h2 className="font-bold border-b border-neutral-400">Skills</h2>
                            {formData.skills && formData.skills.length > 0 ? (
                                <ul className="list-disc pl-5">
                                    {formData.skills.map((skill, index) => (
                                        <li key={index}>{capitalizeEachWord(skill)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No skills yet</p>
                            )}
                        </section>

                        <section className="mb-4">
                            <h2 className="font-bold border-b border-neutral-400">Education</h2>
                            <ul>
                                {formData.educations.map((education, index) => (
                                    <li key={index} className="mb-2">
                                        <p>{capitalizeEachWord(education.school_name)}</p>
                                        <p>{capitalizeEachWord(education.school_address)}</p>
                                        <p>{capitalizeEachWord(education.degree)} in {capitalizeEachWord(education.field_of_study)}</p>
                                        <p>{formatDate(education.enrolldate)} - {formatDate(education.finishdate)}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="mb-4">
                            <h2 className="font-bold border-b border-neutral-400">References</h2>
                            <ul>
                                {formData.references.map((reference, index) => (
                                    <li key={index} className="mb-2">
                                        <p>{capitalizeEachWord(reference.reference_name)}</p>
                                        <p>{reference.reference_position}</p>
                                        <p>{reference.reference_email}</p>
                                        <p>{reference.reference_contact_num}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="column">
                        <section className="mb-4">
                            <h2 className="font-bold border-b border-neutral-400">Experiences</h2>
                            <ul>
                                {formData.experiences.map((experience, index) => {
                                    const startDate = formatDate(experience.startdate);
                                    const endDateDisplay = experience.is_current ? "Present" : formatDate(experience.enddate);
                                    const workDetailBullets = experience.work_details 
                                        ? experience.work_details.split("\n")
                                            .filter(detail => detail.trim() !== "")
                                            .map(detail => detail.replace(/^\s+|\s+$/g, "")) 
                                        : [];

                                    return (
                                        <li key={index} className="mb-4">
                                            <p>{capitalizeEachWord(experience.position)}</p>
                                            <p>{capitalizeEachWord(experience.employer)}</p>
                                            <p>{experience.employer_address}</p>
                                            <p>{startDate} - {endDateDisplay}</p>
                                            {workDetailBullets.length > 0 && (
                                                <ul className="list-disc pl-5">
                                                    {workDetailBullets.map((detail, detailsIndex) => (
                                                        <li key={detailsIndex}>{detail}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}