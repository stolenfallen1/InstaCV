export interface PersonalInfo {
    picture?: string;
    firstname: string;
    lastname: string;
    middleinitial: string;
    email: string;
    contact_number: number;
    country: string;
    municipality: string;
    postalcode: string;
}
export interface Experience {
    position: string;
    employer: string;
    employer_address: string;
    startdate: Date | null;
    is_current: boolean | undefined;
    enddate: Date | null;
    work_details?: string;
}
export interface Education {
    school_name: string;
    school_address: string;
    degree: string;
    field_of_study: string;
    enrolldate: Date | null;
    finishdate: Date | null;
}
export interface Reference {
    reference_name: string;
    reference_email: string;
    reference_contact_num: string;
}
export interface FormData {
    personalInfo: PersonalInfo;
    experiences: Experience[];
    educations: Education[];
    skills: string[];
    references: Reference[];
    summary?: string;
}
export interface ResumeStore {
    formData: FormData;
    updateFormData: <K extends keyof FormData>(section: K, data: FormData[K]) => void;
}