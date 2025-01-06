import React from "react";
import { useResumeStore } from "@/store/resume-store";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useScrollableWithBorder } from "@/hooks/useScrollableWithBorder";
import { Button } from "../ui/button";

export default function ReferenceSection() {
    const { formData, updateFormData } = useResumeStore();
    const [references, setReferences] = React.useState(formData.references || []);
    const { contentRef, showBorder } = useScrollableWithBorder<HTMLDivElement>([references.length]);

    const handleReferenceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedReferences = [...references];
        updatedReferences[index] = { ...updatedReferences[index], [name]: value };

        setReferences(updatedReferences);
        updateFormData("references", updatedReferences);
    }

    const handleAddReference = () => {
        if (references.length >= 3) return alert("You can only add up to 3 references");

        const newReference = {
            reference_name: "",
            reference_position: "",
            reference_email: "",
            reference_contact_num: "",
        };
        setReferences([...references, newReference]);
        updateFormData("references", [...references, newReference]);
    }

    const handleRemoveReference = (index: number) => {
        const updatedReferences = references.filter((_, i) => i !== index);
        setReferences(updatedReferences);
        updateFormData("references", updatedReferences);
    }

    return (
        <main 
            ref={contentRef}
            className={`max-h-[75vh] overflow-y-auto p-2 ${
                showBorder ? 'border-b border-gray-500' : ''
            }`}
        >
            {/* <main> */}
            {references && references.map((reference, index) => (
                <div key={index}>
                    <div>
                        <Label htmlFor="reference_name">Name</Label>
                        <Input 
                            id="reference_name" 
                            type="text" 
                            name="reference_name"
                            value={reference.reference_name}
                            onChange={(e) => handleReferenceChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="reference_position">Position</Label>
                        <Input 
                            id="reference_position" 
                            type="text" 
                            name="reference_position"
                            value={reference.reference_position}
                            onChange={(e) => handleReferenceChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="reference_email">Email Address</Label>
                        <Input 
                            id="reference_email" 
                            type="text" 
                            name="reference_email"
                            value={reference.reference_email}
                            onChange={(e) => handleReferenceChange(index, e)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="reference_contact_num">Contact Number (Optional)</Label>
                        <Input 
                            id="reference_contact_num" 
                            type="number" 
                            name="reference_contact_num"    
                            value={reference.reference_contact_num}
                            onChange={(e) => handleReferenceChange(index, e)}
                        />
                    </div>

                    <Button onClick={() => handleRemoveReference(index)} className="my-3">Remove Reference</Button>
                </div>

            ))}

            <Button onClick={handleAddReference}>Add Reference</Button>
        </main>
    );
}