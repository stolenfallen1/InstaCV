import React from "react";

// import { useResumeStore } from "@/store/resume-store";

import PersonalInfoSection from "./personal-info-section";
import ExperienceSection from "./experience-section";
import EducationSection from "./education-section";
import SkillsSection from "./skills-section";
import ReferenceSection from "./reference-section";
import SummarySection from "./summary-section";

import { Button } from "../ui/button";

interface ResumeForms {
    onPrint: () => void;
}

export function ResumeForms({ onPrint }: ResumeForms) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    // const { formData } = useResumeStore();

    const sections = [
        { id: 1, title: "Personal Information", component: <PersonalInfoSection /> },
        { id: 2, title: "Work Experience", component: <ExperienceSection /> },
        { id: 3, title: "Education", component: <EducationSection /> },
        { id: 4, title: "Skills", 
            component: <SkillsSection 
                            // experiences={formData.experiences} 
                            // educations={formData.educations} 
                            // isActive={currentIndex === 3}
                            /> },
        { id: 5, title: "Reference (3 persons only)", component: <ReferenceSection /> },
        { id: 6, title: "Summary", component: <SummarySection /> },
    ]

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

                {currentIndex === sections.length - 1 ? (
                        <Button
                            onClick={onPrint}
                            className="px-4 py-2 rounded "
                            variant="primary"
                        >
                            Print
                        </Button>
                ) : (
                    <Button
                        onClick={goToNextSection}
                        className="px-4 py-2 rounded"
                    >
                        Next
                    </Button>
                )}

            </div>
        </main>
    );
}