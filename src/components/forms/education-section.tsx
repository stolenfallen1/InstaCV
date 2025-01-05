import React from "react";
import { useResumeStore } from "@/store/resume-store";

import { useScrollableWithBorder } from "@/hooks/useScrollableWithBorder";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import "../../templates/styles/globals.css";

export default function EducationSection() {
    const { formData, updateFormData } = useResumeStore();
    const [educations, setEducations] = React.useState(formData.educations || []);
    const { contentRef, showBorder } = useScrollableWithBorder<HTMLDivElement>([educations.length]);

    const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedEducations = [...educations];
        updatedEducations[index] = { ...updatedEducations[index], [name]: value };

        if (name === "enrolldate" || name === "finishdate") {
            updatedEducations[index][name] = value ? new Date(value) : null;
        }

        setEducations(updatedEducations);
        updateFormData("educations", updatedEducations);
    }

    const handleAddEducation = () => {
        const newEducation = {
            school_name: "",
            school_address: "",
            degree: "",
            field_of_study: "",
            enrolldate: null,
            finishdate: null,
        };
        setEducations([...educations, newEducation]);
        updateFormData("educations", [...educations, newEducation]);
    }

    const handleRemoveEducation = (index: number) => {
        const updatedEducations = educations.filter((_, i) => i !== index);
        setEducations(updatedEducations);
        updateFormData("educations", updatedEducations);
    }

    return (
        <main 
            ref={contentRef}
            className={`max-h-[75vh] overflow-y-auto p-2 ${
                showBorder ? 'border-b border-gray-500' : ''
            }`}
        >
            {educations.map((education, index) => (
                <div key={index}>
                    <div>
                        <Label htmlFor="school_name">School Name</Label>
                        <Input 
                            id="school_name" 
                            type="text" 
                            name="school_name"
                            value={education.school_name}
                            onChange={(e) => handleEducationChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="school_address">School Address</Label>
                        <Input 
                            id="school_address" 
                            type="text" 
                            name="school_address"
                            value={education.school_address}
                            onChange={(e) => handleEducationChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="degree">Degree</Label>
                        <Input 
                            id="degree" 
                            type="text" 
                            name="degree"    
                            value={education.degree}
                            onChange={(e) => handleEducationChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="field_of_study">Field of Study</Label>
                        <Input 
                            id="field_of_study" 
                            type="text" 
                            name="field_of_study"
                            value={education.field_of_study}
                            onChange={(e) => handleEducationChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="enrolldate">Enroll date</Label>
                        <Input 
                            id="enrolldate" 
                            type="date" 
                            name="enrolldate"
                            value={education.enrolldate ? education.enrolldate instanceof Date ? education.enrolldate.toISOString().split("T")[0] : education.enrolldate : ""}
                            onChange={(e) => handleEducationChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="finishdate">Finish date</Label>
                        <Input 
                            id="finishdate" 
                            type="date" 
                            name="finishdate"
                            value={education.finishdate ? education.finishdate instanceof Date ? education.finishdate.toISOString().split("T")[0] : education.finishdate : ""}
                            onChange={(e) => handleEducationChange(index, e)}
                        />
                    </div>

                    <Button onClick={() => handleRemoveEducation(index)} className="my-3">Remove Education</Button>
                </div>
            ))}

            <Button onClick={handleAddEducation}>Add Education</Button>
        </main>
    );
}