import { WorkspacePlan } from '@prisma/client';
import { WorkspaceLimitsInterface } from '../types/workspace.types';

export const PLAN_LIMITS: Record<WorkspacePlan, WorkspaceLimitsInterface> = {
    STARTER: {
        maxForms: 3,
        maxMembers: 1,
        maxSubmissionsPerMonth: 10_000,
    },
    PLUS: {
        maxForms: 10,
        maxMembers: 2,
        maxSubmissionsPerMonth: 50_000,
    },
    PRO: {
        maxForms: 50,
        maxMembers: 5,
        maxSubmissionsPerMonth: 250_000,
    },
    PREMIUM: {
        maxForms: 200,
        maxMembers: 20,
        maxSubmissionsPerMonth: 1_000_000,
    },
    ENTERPRISE: {
        unlimited: true,
    },
};
