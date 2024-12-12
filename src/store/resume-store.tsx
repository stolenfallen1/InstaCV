import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormData, ResumeStore } from "@/types/resume";

export const useResumeStore = create<ResumeStore>()(
    persist(
        (set) => ({
            formData: {
                personalInfo: {
                    picture: "",
                    firstname: "",
                    lastname: "",
                    middleinitial: "",
                    email: "",
                    contact_number: 0,
                    country: "",
                    municipality: "",
                    postalcode: "",
                },
                experiences: [],
                educations: [],
                // skills: [],
                summary: "",
            } as FormData,
            updateFormData: (section, data) => 
                set((state) => ({
                    formData: { ...state.formData, [section]: data }
                })),
        }),
        {
            name: "resume-form-data",
        }
    )
)