import React from "react";

import PersonalInfoSection from "./personal-info-section";
import EducationSection from "./education-section";
import SkillsSection from "./skills-section";
import ExperienceSection from "./experience-section";
import SummarySection from "./summary-section";

import { Button } from "../ui/button";

const sections = [
    { id: 1, title: "Personal Information", component: <PersonalInfoSection /> },
    { id: 2, title: "Work Experience", component: <ExperienceSection /> },
    { id: 3, title: "Education", component: <EducationSection /> },
    { id: 4, title: "Skills", component: <SkillsSection /> },
    { id: 5, title: "Summary", component: <SummarySection /> },
]

export function ResumeForms() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const goToNextSection = () => {
        if (currentIndex < sections.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPreviousSection = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <main className="h-full flex flex-col">
            <div className="flex-grow overflow-hidden relative">
                <div 
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${currentIndex * 100}%)`}}
                >
                    {sections.map((section) => (
                        <div key={section.id} className="w-full flex-shrink-0 p-4">
                            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                            {section.component}
                        </div>
                    ))}; 
                </div>
            </div>

            <div className="flex justify-between items-center p-4">
                <Button
                    onClick={goToPreviousSection}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 rounded"
                >
                    Previous
                </Button>

                <Button
                    onClick={goToNextSection}
                    disabled={currentIndex === sections.length - 1}
                    className="px-4 py-2 rounded"
                >
                    Next
                </Button>
            </div>
        </main>
    );
}