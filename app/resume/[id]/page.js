'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Template1 from '@/components/Template1';

const ResumePage = ({ params }) => {
    const searchParams = useSearchParams();
    const tempid = searchParams.get('template');
    const [formData, setFormData] = useState(null);

    const id = params.id;

    useEffect(() => {
        if (id) {
            const existingResumes = JSON.parse(localStorage.getItem('resumes')) || [];
            const currentResume = existingResumes.find(resume => resume.id === id);

            if (currentResume && currentResume.formData) {
                setFormData(currentResume.formData);
            } else {
                router.push('/my-resumes?message=No resume found');
            }
        }
    }, [id]);

    const renderTemplate = () => {
        switch (tempid) {
            case '1':
                return <Template1 formData={formData} id={id} />;
        }
    };

    return (
        <Suspense>
            <div>
                {formData ? renderTemplate() : <p>Loading...</p>}
            </div>
        </Suspense>
    );
};

export default ResumePage;
