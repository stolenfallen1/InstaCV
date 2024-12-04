import { ResumeForms } from "@/components/forms";
import { TemplateOne } from "@/templates/template-one";

export default function Home() {
    return (
        <>
            <div className='w-1/2 p-4 border-r'>
                <ResumeForms />
            </div>

            <div className='w-1/2 p-4 bg-gray-100'>
                <h2 className='text-xl font-semibold mb-4'>Template Preview</h2>
                <div className='bg-white shadow p-4 rounded'>
                    <TemplateOne />
                </div>
            </div>
        </>
    )
}