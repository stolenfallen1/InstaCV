import React from "react";
import { useResumeStore } from "@/store/resume-store";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function PersonalInfoSection() {
    const { formData, updateFormData } = useResumeStore();
    const [personalInfo, setPersonalInfo] = React.useState(formData.personalInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedInfo = { ...personalInfo, [name]: value };
        setPersonalInfo(updatedInfo);

        updateFormData("personalInfo", updatedInfo);
    }

    return (
        <main>

            <div>
                <Label htmlFor="picture">Picture</Label>
                <Input 
                    id="picture" 
                    type="file" 
                    name="picture"
                    value={personalInfo.picture}
                    onChange={handleChange}  
                />
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