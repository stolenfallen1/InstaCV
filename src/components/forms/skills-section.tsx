import React from "react";
import { Experience, Education } from "@/types/resume";
import { generateContent } from "@/components/gemini-model";
import { useResumeStore } from "@/store/resume-store";

import { Button } from "../ui/button";
import { ArchiveX, RefreshCw, X } from "lucide-react";

interface SkillsSectionProps {
    experiences: Experience[];
    educations: Education[];
    isActive?: boolean;
}

export default function SkillsSection({ experiences, educations, isActive }: SkillsSectionProps) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [skills, setSkills] = React.useState<string[]>([]);
    const [previousSkills, setPreviousSkills] = React.useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
    const updateFormData = useResumeStore((state) => state.updateFormData);

    const skillsPerRequest = 10;

    const fetchSkills = async () => {
        setLoading(true);

        const experiencesPrompt = experiences
            .map((exp) => `${exp.position} at ${exp.employer}`)
            .join(", ");
        const educationPrompt = educations
            .map((edu) => `${edu.degree} in ${edu.field_of_study}`)
            .join(", ");

        const previousSkillsList = previousSkills.length > 0 ? ` Previous skills: ${previousSkills.join(", ")}.` : "";

        const prompt = `
            Based on the user's experience in ${experiencesPrompt} and education in ${educationPrompt}, 
            generate a concise list of ${skillsPerRequest} new skills, tools, or technologies that the user may possess.
            ${previousSkillsList}. Only return a plain, comma-separated list with no extra explanations.
        `;

        try {
            const generatedSkills = await generateContent(prompt);
            const newSkills = generatedSkills.split(", ").map((skill) => skill.trim());

            setSkills(newSkills);
            setPreviousSkills(newSkills);
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (isActive && experiences.length > 0 && educations.length > 0) {
            fetchSkills(); 
        }
    }, [isActive, experiences, educations]);

    const loadMoreSkills = () => {
        fetchSkills();
    }

    const toggleSkillSelection = (skill: string) => {
        setSelectedSkills((prevSkills) => {
            const updatedSkills = prevSkills.includes(skill)
                ? prevSkills.filter((selectedSkill) => selectedSkill !== skill)
                : [...prevSkills, skill];

            updateFormData("skills", updatedSkills);

            return updatedSkills;
        });
    };

    const clearSelection = () => {
        setSelectedSkills([]);
        updateFormData("skills", []);
    }

    return (
        <main>
            <section className="flex items-center justify-between">
                <strong>Skill Selection:</strong>
                {loading ? (
                    <span>Loading...</span>
                ) : (
                    <button
                        className="flex items-center gap-2 hover:text-sky-500"
                        onClick={() => loadMoreSkills()}
                    >
                        <RefreshCw size={16} />
                        Load More Skills
                    </button>
                )}
            </section>

            <div className="flex flex-wrap gap-2 mt-2">
                {skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <Button
                            key={index}
                            onClick={() => toggleSkillSelection(skill)}
                            variant={selectedSkills.includes(skill) ? "default" : "outline"}
                            className="text-sm"
                        >
                            {skill}
                        </Button>
                    ))
                ) : (
                    <p>No generated skills yet, wait for a minute</p>
                )}
            </div>

            <div className="mt-4">
                <section className="flex items-center justify-between">
                    <strong>Selected Skills:</strong>
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:text-red-500"
                        onClick={() => clearSelection()}
                    >
                        <ArchiveX size={16} />
                        Clear Selection
                    </div>
                </section>
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSkills.map((skill, index) => (
                        <Button
                            key={index}
                            onClick={() => toggleSkillSelection(skill)}
                            variant="secondary"
                            className="flex items-center gap-1 text-sm"
                        >
                            {skill} <X size={12} />
                        </Button>
                    ))}
                </div>
            </div>
        </main>
    );
}