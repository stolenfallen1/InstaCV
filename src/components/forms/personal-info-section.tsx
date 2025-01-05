import React from "react";
import { useResumeStore } from "@/store/resume-store";

import { useScrollableWithBorder } from "@/hooks/useScrollableWithBorder";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Trash } from "lucide-react";

export default function PersonalInfoSection() {
    const { formData, updateFormData } = useResumeStore();
    const [personalInfo, setPersonalInfo] = React.useState(formData.personalInfo);
    const { contentRef, showBorder } = useScrollableWithBorder<HTMLDivElement>([personalInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInfo = { ...personalInfo, [name]: value };
        setPersonalInfo(updatedInfo);

        updateFormData("personalInfo", updatedInfo);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Image = reader.result as string;
                localStorage.setItem("resumeImage", base64Image);
                const updatedInfo = { ...personalInfo, picture: base64Image };
                setPersonalInfo(updatedInfo);
                updateFormData("personalInfo", updatedInfo);
            };

            reader.readAsDataURL(file);
        }
    }

    const clearImage = () => {
        localStorage.removeItem("resumeImage");
        const updatedInfo = { ...personalInfo, picture: "" };
        setPersonalInfo(updatedInfo);
        updateFormData("personalInfo", updatedInfo);
    }

    return (
        <main 
        ref={contentRef}
        className={`max-h-[75vh] overflow-y-auto p-2 ${
            showBorder ? 'border-b border-gray-500' : ''
        }`}
    >
            <div>
                <Label htmlFor="picture">Picture</Label>
                <aside className="flex items-center justify-center space-x-4">
                    <Input 
                        id="picture" 
                        type="file" 
                        name="picture"
                        onChange={handleImageChange}  
                    />
                    {personalInfo.picture && (
                        <div>
                            <button 
                                type="button" 
                                onClick={clearImage} 
                                className="text-red-500"
                            >
                                <Trash />
                            </button>
                        </div>
                    )}
                </aside>
            </div>

            <div>
                <Label htmlFor="firstname">Firstname</Label>
                <Input 
                    id="firstname" 
                    type="text"
                    name="firstname"
                    value={personalInfo.firstname}
                    onChange={handleChange} 
                />
            </div>

            <div>
                <Label htmlFor="lastname">Lastname</Label>
                <Input 
                    id="lastname" 
                    type="text"
                    name="lastname"
                    value={personalInfo.lastname}
                    onChange={handleChange} 
                />
            </div>

            <div>
                <Label htmlFor="middleinitial">Middle Initial</Label>
                <Input 
                    id="middleinitial" 
                    type="text"
                    name="middleinitial"
                    maxLength={1}
                    value={personalInfo.middleinitial}
                    onChange={handleChange} 
                />
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    type="email" 
                    name="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input 
                    id="contact_number" 
                    type="number" 
                    name="contact_number"
                    value={personalInfo.contact_number}
                    onChange={handleChange}
                />
            </div>
            
            <div>
                <Label htmlFor="country">Country</Label>
                <Input 
                    id="country" 
                    type="text"
                    name="country"
                    value={personalInfo.country}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label htmlFor="municipality">City / Municipality</Label>
                <Input 
                    id="municipality" 
                    type="text" 
                    name="municipality"
                    value={personalInfo.municipality}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label htmlFor="postalcode">Postal code</Label>
                <Input 
                    id="postalcode" 
                    type="text" 
                    name="postalcode"
                    value={personalInfo.postalcode}
                    onChange={handleChange}
                />
            </div>
        </main>
    );
}