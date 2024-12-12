import React from "react";
import { useResumeStore } from "@/store/resume-store";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function ExperienceSection() {
    const { formData, updateFormData } = useResumeStore();
    const [experiences, setExperiences] = React.useState(formData.experiences);

    const handleExeperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedExperiences = [...experiences];
        updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };

        if (name === "startdate" || name === "enddate") {
            updatedExperiences[index][name] = value ? new Date(value) : null;
        }

        setExperiences(updatedExperiences);
        updateFormData("experiences", updatedExperiences);
    }

    const handleAddExperience = () => {
        const newExperience = { 
            position: "",
            employer: "",
            employer_address: "",
            startdate: null,
            enddate: null,
        };
        setExperiences([...experiences, newExperience]);
        updateFormData("experiences", [...experiences, newExperience]);
    };

    const handleRemoveExperience = (index: number) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        setExperiences(updatedExperiences);
        updateFormData("experiences", updatedExperiences);
    }

    return (
        <main>
            {experiences.map((experience, index) => (
                <div key={index}>                
                    <div>
                        <Label htmlFor="position">Job Title</Label>
                        <Input 
                            id="position" 
                            type="text" 
                            name="position"
                            value={experience.position}
                            onChange={(e) => handleExeperienceChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="employer">Employer</Label>
                        <Input 
                            id="employer" 
                            type="text" 
                            name="employer"
                            value={experience.employer}
                            onChange={(e) => handleExeperienceChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="employer_address">Address</Label>
                        <Input 
                            id="employer_address" 
                            type="text" 
                            name="employer_address"
                            value={experience.employer_address}
                            onChange={(e) => handleExeperienceChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="startdate">Start date</Label>
                        <Input 
                            id="startdate" 
                            type="date" 
                            name="startdate"
                            value={experience.startdate ? experience.startdate instanceof Date ? experience.startdate.toISOString().split("T")[0] : experience.startdate : ""}
                            onChange={(e) => handleExeperienceChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="enddate">End date</Label>
                        <Input 
                            id="enddate" 
                            type="date" 
                            name="enddate"
                            value={experience.enddate ? experience.enddate instanceof Date ? experience.enddate.toISOString().split("T")[0] : experience.enddate : ""}
                            onChange={(e) => handleExeperienceChange(index, e)}
                        />
                    </div>

                    <Button onClick={() => handleRemoveExperience(index)}>Remove Experience</Button>
                </div>
            ))}

            <Button onClick={handleAddExperience}>Add Experience</Button>
        </main>
    );
}