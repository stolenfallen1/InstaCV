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
    const [userInputSkill, setUserInputSkill] = React.useState<string>(""); 
    const [userAddedSkills, setUserAddedSkills] = React.useState<string[]>([]);
    const [previousSkills, setPreviousSkills] = React.useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
    const updateFormData = useResumeStore((state) => state.updateFormData);

    const skillsPerRequest = 10;

    // const fetchSkills = async () => {
    //     setLoading(true);

    //     const experiencesPrompt = experiences
    //         .map((exp) => `${exp.position} at ${exp.employer}`)
    //         .join(", ");
    //     const educationPrompt = educations
    //         .map((edu) => `${edu.degree} in ${edu.field_of_study}`)
    //         .join(", ");

    //     const previousSkillsList = previousSkills.length > 0 ? ` Previous skills: ${previousSkills.join(", ")}.` : "";

    //     const prompt = `
    //         Based on the user's experience in ${experiencesPrompt} and education in ${educationPrompt}, 
    //         generate a concise list of ${skillsPerRequest} new skills, tools, or technologies that the user may possess.
    //         ${previousSkillsList}. Only return a plain, comma-separated list with no extra explanations.
    //     `;

    //     try {
    //         const generatedSkills = await generateContent(prompt);
    //         const newSkills = generatedSkills.split(", ").map((skill) => skill.trim());

    //         setSkills(newSkills);
    //         setPreviousSkills(newSkills);
    //     } catch (error) {
    //         console.error("Error fetching skills:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // React.useEffect(() => {
    //     if (isActive && experiences.length > 0 && educations.length > 0) {
    //         fetchSkills(); 
    //     }
    // }, [isActive, experiences, educations]);

    // const loadMoreSkills = () => {
    //     fetchSkills();
    // }

    const addUserSkill = () => {
        if (userInputSkill.trim() !== "" && !userAddedSkills.includes(userInputSkill.trim())) {
            const newSkill = userInputSkill.trim();
            const updatedSkills = [...userAddedSkills, newSkill];
            setUserAddedSkills(updatedSkills);
            updateFormData("skills", [...selectedSkills, ...updatedSkills]);
            setUserInputSkill(""); 
        }
    };

    const toggleSkillSelection = (skill: string) => {
        setSelectedSkills((prevSkills) => {
            const updatedSkills = prevSkills.includes(skill)
                ? prevSkills.filter((selectedSkill) => selectedSkill !== skill)
                : [...prevSkills, skill];

            updateFormData("skills", updatedSkills);

            return updatedSkills;
        });
    };

    const removeSkill = (skill: string) => {
        const updatedSelectedSkills = selectedSkills.filter((selectedSkill) => selectedSkill !== skill);
        const updatedUserAddedSkills = userAddedSkills.filter((addedSkill) => addedSkill !== skill);
    
        setSelectedSkills(updatedSelectedSkills);
        setUserAddedSkills(updatedUserAddedSkills);
    
        updateFormData("skills", [...updatedSelectedSkills, ...updatedUserAddedSkills]);
    };
    

    const clearAllSkills = () => {
        setSelectedSkills([]);
        setUserAddedSkills([]);
        updateFormData("skills", []);
    }

    const combinedSkills = [...selectedSkills, ...userAddedSkills];

    return (
        <main>
            <section className="mt-4">
                <input
                    type="text"
                    value={userInputSkill}
                    onChange={(e) => setUserInputSkill(e.target.value)}
                    placeholder="Enter a skill"
                    className="border rounded px-2 py-1 w-full"
                />
                <Button onClick={addUserSkill} className="mt-2">
                    Add Skill
                </Button>
            </section>

            {skills.length > 0 && (
                <>
                    <section className="flex items-center justify-between mt-4">
                        <strong>AI-Generated Skills Suggestions: </strong>
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
                        {skills.map((skill, index) => (
                            <Button
                                key={index}
                                onClick={() => toggleSkillSelection(skill)}
                                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                                className="text-sm"
                            >
                                {skill}
                            </Button>
                        ))}
                    </div>
                </>
            )}

            <div className="mt-4">
                <section className="flex items-center justify-between">
                    <strong>Skills Lists:</strong>
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:text-red-500"
                        onClick={() => clearAllSkills()}
                    >
                        <ArchiveX size={16} />
                        Clear Skills
                    </div>
                </section>
                <div className="flex flex-wrap gap-2 mt-2">
                    {combinedSkills.map((skill, index) => (
                        <Button
                        key={index}
                        onClick={() => removeSkill(skill)}
                        variant="secondary"
                        className="text-sm flex items-center p-2 space-x-2 max-w-[300px]"
                        >
                        <span className="truncate flex-1">{skill}</span>
                        <X size={12} className="flex-shrink-0" />
                        </Button>
                    ))}
                </div>
            </div>
        </main>
    );
}