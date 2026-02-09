import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasourceUrl: 'file:./dev.db',
});

async function main() {
    console.log('🌱 Seeding database...');

    // Create demo user
    const user = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
            email: 'demo@example.com',
            name: 'Demo User',
            passwordHash: 'demo-password-hash', // In production, use proper hashing
        },
    });
    console.log('✅ Created user:', user.email);

    // Create companies
    const eduAi = await prisma.company.upsert({
        where: { eik: '205123456' },
        update: {},
        create: {
            userId: user.id,
            name: 'EduAI Bulgaria ЕООД',
            nameBg: 'ЕдуАИ България ЕООД',
            eik: '205123456',
            legalForm: 'EOOD',
            registrationDate: new Date('2023-02-15'),
            address: 'бул. Витоша 100',
            city: 'София',
            employees: 8,
            annualRevenue: 450000,
            balanceSheetTotal: 380000,
            sizeClass: 'MICRO',
            industries: JSON.stringify(['62.01', '85.59']),
            activities: JSON.stringify(['SOFTWARE_DEVELOPMENT', 'AI_ML', 'EDUCATIONAL_SERVICES', 'CONTENT_CREATION', 'DIGITAL_TRANSFORMATION']),
            hasPatents: true,
            rdSpending: 45000,
            hasUniversityCollab: true,
            previousEuProjects: 0,
            isComplete: true,
        },
    });
    console.log('✅ Created company:', eduAi.name);

    const printLabs = await prisma.company.upsert({
        where: { eik: '204789123' },
        update: {},
        create: {
            userId: user.id,
            name: '3D Print Labs ООД',
            nameBg: '3Д Принт Лабс ООД',
            eik: '204789123',
            legalForm: 'OOD',
            registrationDate: new Date('2021-06-10'),
            address: 'ул. Индустриална 25',
            city: 'Пловдив',
            employees: 15,
            annualRevenue: 1200000,
            balanceSheetTotal: 850000,
            sizeClass: 'SMALL',
            industries: JSON.stringify(['25.99', '22.29']),
            activities: JSON.stringify(['MANUFACTURING', '3D_PRINTING', 'RND', 'IOT']),
            hasPatents: false,
            rdSpending: 80000,
            hasUniversityCollab: false,
            previousEuProjects: 1,
            isComplete: true,
        },
    });
    console.log('✅ Created company:', printLabs.name);

    const tutorHub = await prisma.company.upsert({
        where: { eik: '203456789' },
        update: {},
        create: {
            userId: user.id,
            name: 'TutorHub ЕООД',
            nameBg: 'ТуторХъб ЕООД',
            eik: '203456789',
            legalForm: 'EOOD',
            registrationDate: new Date('2019-09-01'),
            address: 'бул. Приморски 50',
            city: 'Варна',
            employees: 12,
            annualRevenue: 380000,
            balanceSheetTotal: 280000,
            sizeClass: 'SMALL',
            industries: JSON.stringify(['85.59']),
            activities: JSON.stringify(['EDUCATIONAL_SERVICES', 'TUTORING', 'STEM_EDUCATION', 'VOCATIONAL_TRAINING']),
            hasPatents: false,
            rdSpending: null,
            hasUniversityCollab: false,
            previousEuProjects: 0,
            isComplete: true,
        },
    });
    console.log('✅ Created company:', tutorHub.name);

    // Create funding programs
    const programEducation = await prisma.fundingProgram.upsert({
        where: { id: 'prog-education-digital' },
        update: {},
        create: {
            id: 'prog-education-digital',
            name: 'Programme "Education" 2021-2027',
            nameBg: 'Програма "Образование" 2021-2027',
            description: 'Development of digital educational resources and AI-powered learning platforms for Bulgarian schools.',
            descriptionBg: 'Разработване на дигитални образователни ресурси и платформи за обучение с изкуствен интелект за българските училища.',
            operationalProgram: 'Education 2021-2027',
            procedure: 'Digital Educational Content Development',
            minAmount: 50000,
            maxAmount: 200000,
            coFinancingRate: 100,
            currency: 'EUR',
            totalBudget: 15000000,
            openDate: new Date('2026-01-01'),
            closeDate: new Date('2026-04-15'),
            projectDurationMin: 12,
            projectDurationMax: 24,
            eligibleLegalForms: JSON.stringify(['EOOD', 'OOD', 'AD']),
            eligibleSizeClasses: JSON.stringify(['MICRO', 'SMALL', 'MEDIUM']),
            eligibleIndustries: JSON.stringify(['62.01', '85.59', '85.60']),
            eligibleActivities: JSON.stringify(['EDUCATIONAL_SERVICES', 'SOFTWARE_DEVELOPMENT', 'AI_ML', 'CONTENT_CREATION']),
            eligibleRegions: JSON.stringify(['all']),
            fundableActivities: JSON.stringify([
                'Development of interactive digital educational content',
                'Creation of AI-powered learning materials',
                'Teacher training on digital tools',
                'Integration with existing educational platforms',
                'Pilot testing in schools'
            ]),
            requiredDocuments: JSON.stringify([
                'Application Form',
                'Company Current Status Certificate',
                'Financial Statements (last 2 years)',
                'Project Proposal',
                'Budget',
                'Declaration of Compliance'
            ]),
            isunUrl: 'https://eumis2020.government.bg/bg/s/Procedure/Info/education-digital',
            euFundsUrl: 'https://eufunds.bg/bg/opnoir/education-digital',
            guidelinesUrl: 'https://eufunds.bg/sites/default/files/guidelines_education.pdf',
            managingAuthority: 'Executive Agency "Programme Education"',
            status: 'OPEN',
        },
    });
    console.log('✅ Created funding program:', programEducation.name);

    const esfSkills = await prisma.fundingProgram.upsert({
        where: { id: 'prog-esf-skills' },
        update: {},
        create: {
            id: 'prog-esf-skills',
            name: 'ESF+ Skills for Green & Digital Transition',
            nameBg: 'ЕСФ+ Умения за зелен и дигитален преход',
            description: 'Training programs for teachers and educators on digital competence and green skills.',
            descriptionBg: 'Програми за обучение на учители и преподаватели по дигитална компетентност и зелени умения.',
            operationalProgram: 'Human Resources Development 2021-2027',
            procedure: 'Teacher Digital Competence Training',
            minAmount: 30000,
            maxAmount: 150000,
            coFinancingRate: 90,
            currency: 'EUR',
            totalBudget: 25000000,
            openDate: new Date('2026-02-01'),
            closeDate: new Date('2026-05-30'),
            projectDurationMin: 6,
            projectDurationMax: 18,
            eligibleLegalForms: JSON.stringify(['EOOD', 'OOD', 'AD', 'ET']),
            eligibleSizeClasses: JSON.stringify(['MICRO', 'SMALL', 'MEDIUM']),
            eligibleIndustries: JSON.stringify(['85.59', '85.60', '62.01']),
            eligibleActivities: JSON.stringify(['EDUCATIONAL_SERVICES', 'VOCATIONAL_TRAINING', 'DIGITAL_TRANSFORMATION']),
            eligibleRegions: JSON.stringify(['all']),
            fundableActivities: JSON.stringify([
                'Teacher training programs',
                'Digital skills workshops',
                'Green transition education',
                'Certification programs'
            ]),
            requiredDocuments: JSON.stringify([
                'Application Form',
                'Company Registration',
                'Training Program Description',
                'Budget',
                'Trainer Qualifications'
            ]),
            isunUrl: 'https://eumis2020.government.bg/bg/s/Procedure/Info/esf-skills',
            euFundsUrl: 'https://eufunds.bg/bg/ophrd/esf-skills',
            managingAuthority: 'Ministry of Labour and Social Policy',
            status: 'OPEN',
        },
    });
    console.log('✅ Created funding program:', esfSkills.name);

    const digitalization = await prisma.fundingProgram.upsert({
        where: { id: 'prog-digitalization-sme' },
        update: {},
        create: {
            id: 'prog-digitalization-sme',
            name: 'Digitalization for Micro & Small Enterprises',
            nameBg: 'Дигитализация за микро и малки предприятия',
            description: 'Grants for implementing digital solutions like ERP, CRM, IoT, and cybersecurity in small businesses.',
            descriptionBg: 'Безвъзмездна помощ за внедряване на дигитални решения като ERP, CRM, IoT и киберсигурност в малки предприятия.',
            operationalProgram: 'Competitiveness and Innovation 2021-2027',
            procedure: 'ICT Solutions Implementation',
            minAmount: 2560,
            maxAmount: 25600,
            coFinancingRate: 70,
            currency: 'EUR',
            totalBudget: 40000000,
            openDate: new Date('2025-12-01'),
            closeDate: new Date('2026-02-28'),
            projectDurationMin: 3,
            projectDurationMax: 12,
            eligibleLegalForms: JSON.stringify(['EOOD', 'OOD', 'AD', 'ET']),
            eligibleSizeClasses: JSON.stringify(['MICRO', 'SMALL']),
            eligibleIndustries: JSON.stringify(['all']),
            eligibleActivities: JSON.stringify(['all']),
            eligibleRegions: JSON.stringify(['all']),
            fundableActivities: JSON.stringify([
                'ERP/CRM implementation',
                'Cloud migration',
                'Cybersecurity solutions',
                'E-commerce platforms',
                'IoT integration'
            ]),
            requiredDocuments: JSON.stringify([
                'Application Form',
                'Company Registration',
                'Financial Statements',
                'Digital Transformation Plan'
            ]),
            isunUrl: 'https://eumis2020.government.bg/bg/s/Procedure/Info/digitalization-sme',
            euFundsUrl: 'https://eufunds.bg/bg/opik/digitalization',
            managingAuthority: 'Ministry of Innovation and Growth',
            status: 'OPEN',
        },
    });
    console.log('✅ Created funding program:', digitalization.name);

    const industry40 = await prisma.fundingProgram.upsert({
        where: { id: 'prog-industry40' },
        update: {},
        create: {
            id: 'prog-industry40',
            name: 'Industry 4.0 Digital Transformation Grant',
            nameBg: 'Безвъзмездна помощ Индустрия 4.0',
            description: 'Grants for implementing Industry 4.0 technologies: IoT, digital twins, AI, big data, and 3D printing.',
            descriptionBg: 'Безвъзмездна помощ за внедряване на технологии Индустрия 4.0: IoT, дигитални близнаци, ИИ, големи данни и 3D принтиране.',
            operationalProgram: 'Competitiveness and Innovation 2021-2027',
            procedure: 'Industry 4.0 Technologies',
            minAmount: 76690,
            maxAmount: 434600,
            coFinancingRate: 70,
            currency: 'EUR',
            totalBudget: 54200000,
            openDate: new Date('2025-09-01'),
            closeDate: new Date('2026-12-15'),
            projectDurationMin: 12,
            projectDurationMax: 36,
            eligibleLegalForms: JSON.stringify(['EOOD', 'OOD', 'AD']),
            eligibleSizeClasses: JSON.stringify(['SMALL', 'MEDIUM']),
            eligibleIndustries: JSON.stringify(['25.99', '22.29', '28', '29', '30']),
            eligibleActivities: JSON.stringify(['MANUFACTURING', '3D_PRINTING', 'IOT', 'AI_ML', 'RND']),
            eligibleRegions: JSON.stringify(['all']),
            fundableActivities: JSON.stringify([
                'Industrial IoT implementation',
                'Digital twin development',
                'AI-based quality control',
                'Big data analytics',
                '3D printing equipment',
                'Virtual/Augmented reality'
            ]),
            requiredDocuments: JSON.stringify([
                'Application Form',
                'Company Registration',
                'Financial Statements (3 years)',
                'Technical Project Description',
                'Budget',
                'ISO Certifications'
            ]),
            isunUrl: 'https://eumis2020.government.bg/bg/s/Procedure/Info/industry40',
            euFundsUrl: 'https://eufunds.bg/bg/opik/industry40',
            managingAuthority: 'Ministry of Innovation and Growth',
            status: 'OPEN',
        },
    });
    console.log('✅ Created funding program:', industry40.name);

    console.log('');
    console.log('🎉 Database seeding completed!');
    console.log(`   - ${await prisma.user.count()} user(s)`);
    console.log(`   - ${await prisma.company.count()} company(ies)`);
    console.log(`   - ${await prisma.fundingProgram.count()} funding program(s)`);
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
