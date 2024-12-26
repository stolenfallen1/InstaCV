import { useResumeStore } from "@/store/resume-store";

import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function SummarySection() {
    const { formData, updateFormData } = useResumeStore();

    return (
        <main>
            <Label htmlFor="summary">Summary</Label>
            <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={e => updateFormData("summary", e.target.value)}
            />
        </main>
    );
}