import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function EducationSection() {
    return (
        <main>
            <Label htmlFor="school_name">School Name</Label>
            <Input id="school_name" type="text" />
            <Label htmlFor="school_location">School location</Label>
            <Input id="school_location" type="text" />
            <Label htmlFor="degree">Degree</Label>
            <Input id="degree" type="text" />
            <Label htmlFor="field_of_study">Field Of Study</Label>
            <Input id="field_of_study" type="text" />
            <Label htmlFor="enrolldate">Enroll date</Label>
            <Input id="enrolldate" type="date" />
            <Label htmlFor="finishdate">Finish date</Label>
            <Input id="finishdate" type="date" />
        </main>
    );
}