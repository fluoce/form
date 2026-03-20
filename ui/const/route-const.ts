import { formSettingTab, WorkspaceSettingTab } from "@/types/type";

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
  setting: (workspaceId: string, tab: WorkspaceSettingTab) => {
    return `${workspaceBase}/${workspaceId}/${tab}`;
  },
};

// form routes

const formBase = "/form";

export const formRoutes = {
  setting: (workspaceId: string, formId: string, tab: formSettingTab) => {
    return `${formBase}/${workspaceId}/${formId}/${tab}`;
  },
};

// docs routes

const docsBase = "/docs";

export const docsRoutes = {
  base: `${docsBase}`,
};
