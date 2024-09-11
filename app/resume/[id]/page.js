'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Template1 from '@/components/Template1';
import Loading from '@/components/Loading';
import Template2 from '@/components/Template2';
import Template3 from '@/components/Template3';

const ResumePage = ({ params }) => {
    const [formData, setFormData] = useState(null);
    const [tempid, setTempid] = useState(null);
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        if (!id) return;

        try {
            const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];
            const currentResume = existingResumes.find(resume => resume.id === id);

            if (currentResume && currentResume.formData) {
                setFormData(currentResume.formData);
                const templateId = currentResume.formData.template;
                setTempid(templateId);
            } else if (currentResume) {
                router.push(`/form/${id}`);
            } else {
                router.push('/my-resumes');    
            }
        } catch (error) {
            console.error('Error fetching resume data:', error);
            router.push('/my-resumes?message=Error fetching data');
        }
    }, [id, router]);

    const templateComponents = {
        1: Template1,
        2: Template2,
        3: Template3
    };

    const TemplateComponent = templateComponents[tempid] || (() => <div>Template Not Found</div>);

    return (
        <div>
            {formData ? <TemplateComponent formData={formData} id={id} /> : <Loading />}
        </div>
    );
};

export default ResumePage;
