import { formSettingTab } from "@/types/type";

const base = "/dash";

// workspace routes

const workspaceBase = "/ws";

export const workspaceRoutes = {
  create: `${base}/create-workspace`,
  dash: (workspaceId: string) => {
    return `${base}/${workspaceId}`;
  },
  allForm: (workspaceId: string) => {
    return `${base}/${workspaceId}/forms`;
  },
  settings: (workspaceId: string) => {
    return `${base}/${workspaceId}/settings`;
  },
};

// form routes

const formBase = "/form";

export const formRoutes = {
  setting: (workspaceId: string, formId: string, tab: formSettingTab) => {
    return `${formBase}/${workspaceId}/${formId}/${tab}`;
  },
  preview: (formId: string) => {
    return `${formBase}/preview/${formId}`;
  },
};

// trash routes

const trashBase = "/trash";

export const trashRoutes = {
  forms: (workspaceId: string) => {
    return `${workspaceRoutes.dash(workspaceId)}${trashBase}/forms`;
  },
  workspaces: (workspaceId: string) => {
    return `${workspaceRoutes.dash(workspaceId)}${trashBase}/workspaces`;
  },
};

// docs routes

const docsBase = "/docs";

export const docsRoutes = {
  base: `${docsBase}`,
};
