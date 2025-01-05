import React from "react";
import { useResumeStore } from "@/store/resume-store";

import { useScrollableWithBorder } from "@/hooks/useScrollableWithBorder";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import "../../templates/styles/globals.css";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

export default function ExperienceSection() {
    const { formData, updateFormData } = useResumeStore();
    const [experiences, setExperiences] = React.useState(formData.experiences || []);
    const { contentRef, showBorder } = useScrollableWithBorder<HTMLDivElement>([experiences.length]);

    const handleExeperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let checked: boolean | undefined = undefined;
        if (type === 'checkbox') {
            checked = (e.target as HTMLInputElement).checked;
        }
        
        setExperiences(prevExperiences => {
            const updatedExperiences = [...prevExperiences];
            
            if (type === 'checkbox' && name === 'is_current') {
                updatedExperiences[index] = { 
                    ...updatedExperiences[index], 
                    is_current: checked,
                    enddate: checked ? null : updatedExperiences[index].enddate
                };
            } else {
                updatedExperiences[index] = { 
                    ...updatedExperiences[index], 
                    [name]: 
                        name === 'startdate' || name === 'enddate' 
                            ? (value ? new Date(value) : null)
                            : value
                };
            }
    
            updateFormData("experiences", updatedExperiences);
            return updatedExperiences;
        });
    };

    const handleAddExperience = () => {
        const newExperience = { 
            position: "",
            employer: "",
            employer_address: "",
            startdate: null,
            is_current: false,
            enddate: null,
            work_details: ""
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
        <main 
            ref={contentRef}
            className={`max-h-[75vh] overflow-y-auto p-2 ${
                showBorder ? 'border-b border-gray-500' : ''
            }`}
        >
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

                    <div className="flex items-center space-x-2 my-2">
                        <Checkbox 
                            id="is_current" 
                            name="is_current"
                            checked={experience.is_current} 
                            onCheckedChange={(checked) => {
                                const event = {
                                    target: {
                                        name: 'is_current',
                                        value: checked,
                                        type: 'checkbox',
                                        checked: checked
                                    }
                                } as React.ChangeEvent<HTMLInputElement>;
                                handleExeperienceChange(index, event);
                            }}
                        />
                        <Label htmlFor="is_current">Present</Label>
                    </div>

                    <div>
                        <Label htmlFor="enddate">End date</Label>
                        <Input 
                            id="enddate" 
                            type="date" 
                            name="enddate"
                            disabled={experience.is_current}
                            value={experience.enddate ? experience.enddate instanceof Date ? experience.enddate.toISOString().split("T")[0] : experience.enddate : ""}
                            onChange={(e) => handleExeperienceChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="work_details">Work Details ( Press Enter for new bullet )</Label>
                        <Textarea 
                            id="work_details" 
                            name="work_details"
                            placeholder="Accomplishments, responsibilities, etc."
                            value={experience.work_details}
                            onChange={(e) => handleExeperienceChange(index, e)}
                        />
                    </div>

                    <Button onClick={() => handleRemoveExperience(index)} className="my-3">Remove Experience</Button>
                </div>
            ))}

            <Button onClick={handleAddExperience}>Add Experience</Button>
        </main>
    );
}