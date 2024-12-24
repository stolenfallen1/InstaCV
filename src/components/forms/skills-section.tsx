import React from "react";
import { Experience, Education } from "@/types/resume";
import { generateContent } from "@/components/gemini-model";

interface SkillsSectionProps {
    experiences: Experience[];
    educations: Education[];
    isActive?: boolean;
}

export default function SkillsSection({ experiences, educations, isActive }: SkillsSectionProps) {
    const [skills, setSkills] = React.useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (!isActive || experiences.length === 0 || educations.length === 0) {
            return;
        }

        const experiencesPrompt = experiences 
            .map((exp) => `${exp.position} at ${exp.employer}`)
            .join(", ");
        const educationPrompt = educations
            .map((edu) => `${edu.degree} in ${edu.field_of_study}`)
            .join(", ");

        const prompt = `
            Based on the following work experience and education, generate a list of skills for the users resume, here are the following experiences and education:
            Work Experience: ${experiencesPrompt}
            Education: ${educationPrompt}
        `;

        const fetchSkills = async () => {
            const generatedSkills = await generateContent(prompt);
            setSkills(generatedSkills.split(", ").map((skill) => skill.trim()));
        }

        if (experiences.length > 0 && educations.length > 0) {
            fetchSkills();
        }

    }, [isActive, experiences, educations]);

    const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedSkills(selectedOptions);
    }

    return (
        <section>
            <h2>Skills</h2>
            <p>Select the skills you possess based on your experience and education:</p>
        
            <select
                multiple
                value={selectedSkills}
                onChange={handleSkillChange}
                className="w-full p-2 border rounded"
            >
                {skills.length > 0 ? (
                skills.map((skill, index) => (
                    <option key={index} value={skill}>
                    {skill}
                    </option>
                ))
                ) : (
                <option disabled>No skills generated yet</option>
                )}
            </select>
        
            <div className="mt-2">
                <strong>Selected Skills:</strong>
                <ul>
                {selectedSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
                </ul>
            </div>
        </section>
    );
}