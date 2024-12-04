export interface PersonalInfo {
    picture: string;
    firstname: string;
    lastname: string;
    email: string;
    contact_number: number;
    country: string;
    municipality: string;
    postalcode: string;
}

export interface Experience {
    position: string;
    employer: string;
    address: string;
    startdate: Date | null;
    enddate: Date | null;
}

export interface Education {
    school_name: string;
    school_location: string;
    degree: string;
    field_of_study: string;
    enrolldate: Date | null;
    finishdate: Date | null;
}

export interface FormData {
    personalInfo: PersonalInfo;
    experiences: Experience[];
    educations: Education[];
    // Add more here
}

export interface ResumeStore {
    formData: FormData;
    updateFormData: <K extends keyof FormData>(section: K, data: FormData[K]) => void;
}