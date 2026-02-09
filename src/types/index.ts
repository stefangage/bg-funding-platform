// Company Types
export interface Company {
    id: string;
    userId: string;
    name: string;
    nameBg?: string;
    eik: string;
    legalForm: LegalForm;
    registrationDate?: Date;
    address?: string;
    city?: string;
    employees: number;
    annualRevenue: number;
    balanceSheetTotal: number;
    sizeClass: SizeClass;
    industries: string[];
    activities: ActivityType[];
    hasPatents: boolean;
    rdSpending?: number;
    hasUniversityCollab: boolean;
    previousEuProjects: number;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type LegalForm = 'EOOD' | 'OOD' | 'AD' | 'ET' | 'SD' | 'KD' | 'KDA';

export type SizeClass = 'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE';

export type ActivityType =
    | 'SOFTWARE_DEVELOPMENT'
    | 'AI_ML'
    | 'EDUCATIONAL_SERVICES'
    | 'CONTENT_CREATION'
    | 'MANUFACTURING'
    | 'RND'
    | 'DIGITAL_TRANSFORMATION'
    | '3D_PRINTING'
    | 'IOT'
    | 'TUTORING'
    | 'STEM_EDUCATION'
    | 'VOCATIONAL_TRAINING';

// Funding Program Types
export interface FundingProgram {
    id: string;
    name: string;
    nameBg: string;
    description: string;
    descriptionBg: string;
    operationalProgram: string;
    procedure: string;
    minAmount: number;
    maxAmount: number;
    coFinancingRate: number;
    currency: string;
    totalBudget?: number;
    openDate: Date;
    closeDate: Date;
    projectDurationMin: number;
    projectDurationMax: number;
    eligibleLegalForms: LegalForm[];
    eligibleSizeClasses: SizeClass[];
    eligibleIndustries: string[];
    eligibleActivities: ActivityType[];
    eligibleRegions: string[];
    fundableActivities: string[];
    requiredDocuments: string[];
    isunUrl?: string;
    euFundsUrl?: string;
    guidelinesUrl?: string;
    managingAuthority?: string;
    status: ProgramStatus;
    lastVerified: Date;
}

export type ProgramStatus = 'UPCOMING' | 'OPEN' | 'CLOSED' | 'CANCELLED';

// Application Types
export interface Application {
    id: string;
    companyId: string;
    fundingProgramId: string;
    projectTitle: string;
    projectTitleBg: string;
    projectDescription?: string;
    projectDescriptionBg?: string;
    matchScore: number;
    eligibilityNotes?: EligibilityCheck[];
    requestedAmount: number;
    coFinancingAmount: number;
    status: ApplicationStatus;
    isunReferenceNumber?: string;
    submittedAt?: Date;
    submissionNotes?: string;
    startedAt: Date;
    updatedAt: Date;
}

export type ApplicationStatus =
    | 'DRAFT'
    | 'IN_PROGRESS'
    | 'READY'
    | 'SUBMITTED'
    | 'UNDER_REVIEW'
    | 'APPROVED'
    | 'REJECTED';

export interface EligibilityCheck {
    criterion: string;
    passed: boolean;
    note?: string;
}

// Task Types
export interface Task {
    id: string;
    applicationId: string;
    title: string;
    titleBg: string;
    description: string;
    descriptionBg: string;
    category: TaskCategory;
    orderIndex: number;
    week: number;
    dueDate: Date;
    whereToGet?: string;
    howToGet?: string;
    processingTime?: string;
    officialUrl?: string;
    status: TaskStatus;
    completedAt?: Date;
    notes?: string;
}

export type TaskCategory =
    | 'PREPARATION'
    | 'DOCUMENT'
    | 'PROPOSAL'
    | 'BUDGET'
    | 'REVIEW'
    | 'SUBMISSION';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';

// Dashboard Types
export interface DashboardStats {
    matchingPrograms: number;
    closingSoon: number;
    activeApplications: number;
    totalPotentialFunding: number;
}

export interface FundingMatch {
    program: FundingProgram;
    matchScore: number;
    eligibilityChecks: EligibilityCheck[];
    daysUntilDeadline: number;
}

// Form Types
export interface CompanyFormData {
    name: string;
    nameBg?: string;
    eik: string;
    legalForm: LegalForm;
    registrationDate?: string;
    address?: string;
    city?: string;
    employees: number;
    annualRevenue: number;
    balanceSheetTotal: number;
    industries: string[];
    activities: ActivityType[];
    hasPatents: boolean;
    rdSpending?: number;
    hasUniversityCollab: boolean;
    previousEuProjects: number;
}

// Bulgarian Cities
export const BULGARIAN_CITIES = [
    'София', 'Пловдив', 'Варна', 'Бургас', 'Русе',
    'Стара Загора', 'Плевен', 'Сливен', 'Добрич', 'Шумен',
    'Перник', 'Хасково', 'Ямбол', 'Пазарджик', 'Благоевград',
    'Велико Търново', 'Враца', 'Габрово', 'Кюстендил', 'Монтана'
];

// Legal Form Labels
export const LEGAL_FORM_LABELS: Record<LegalForm, { en: string; bg: string }> = {
    EOOD: { en: 'Single-Member LLC', bg: 'ЕООД' },
    OOD: { en: 'Limited Liability Company', bg: 'ООД' },
    AD: { en: 'Joint Stock Company', bg: 'АД' },
    ET: { en: 'Sole Trader', bg: 'ЕТ' },
    SD: { en: 'General Partnership', bg: 'СД' },
    KD: { en: 'Limited Partnership', bg: 'КД' },
    KDA: { en: 'Partnership Limited by Shares', bg: 'КДА' }
};

// Size Class Labels
export const SIZE_CLASS_LABELS: Record<SizeClass, { en: string; bg: string; maxEmployees: number; maxRevenue: number }> = {
    MICRO: { en: 'Micro Enterprise', bg: 'Микро предприятие', maxEmployees: 10, maxRevenue: 3900000 },
    SMALL: { en: 'Small Enterprise', bg: 'Малко предприятие', maxEmployees: 50, maxRevenue: 19500000 },
    MEDIUM: { en: 'Medium Enterprise', bg: 'Средно предприятие', maxEmployees: 250, maxRevenue: 97500000 },
    LARGE: { en: 'Large Enterprise', bg: 'Голямо предприятие', maxEmployees: Infinity, maxRevenue: Infinity }
};

// Activity Labels
export const ACTIVITY_LABELS: Record<ActivityType, { en: string; bg: string }> = {
    SOFTWARE_DEVELOPMENT: { en: 'Software Development', bg: 'Разработка на софтуер' },
    AI_ML: { en: 'Artificial Intelligence / Machine Learning', bg: 'Изкуствен интелект / Машинно обучение' },
    EDUCATIONAL_SERVICES: { en: 'Educational Services', bg: 'Образователни услуги' },
    CONTENT_CREATION: { en: 'Content Creation', bg: 'Създаване на съдържание' },
    MANUFACTURING: { en: 'Manufacturing', bg: 'Производство' },
    RND: { en: 'Research & Development', bg: 'Научноизследователска и развойна дейност' },
    DIGITAL_TRANSFORMATION: { en: 'Digital Transformation Services', bg: 'Услуги за дигитална трансформация' },
    '3D_PRINTING': { en: '3D Printing / Additive Manufacturing', bg: '3D принтиране / Адитивно производство' },
    IOT: { en: 'Internet of Things', bg: 'Интернет на нещата' },
    TUTORING: { en: 'Private Tutoring', bg: 'Частни уроци' },
    STEM_EDUCATION: { en: 'STEM Education', bg: 'STEM образование' },
    VOCATIONAL_TRAINING: { en: 'Vocational Training', bg: 'Професионално обучение' }
};
