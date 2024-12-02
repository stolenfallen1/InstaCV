import PersonalInfoSection from "./personal-info-section";
import EducationSection from "./education-section";
import SkillsSection from "./skills-section";
import ExperienceSection from "./experience-section";

export function ResumeForms() {
    return (
        <form className="p-10 space-y-6">
            <PersonalInfoSection />
            <EducationSection />
            <SkillsSection />
            <ExperienceSection />
        </form>
    );
}