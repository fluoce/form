import { WorkspaceStatus, FormStatus } from "./slice";

export type WorkspaceUpdateInputType = {
  workspaceId: string;
  name?: string;
  status?: WorkspaceStatus;
};

export type formSettingTab = "general" | "edit" | "result" | "share";

export type formUpdateInputType = {
  formId: string;
  workspaceId: string;
  name?: string;
  status?: FormStatus;
};

export type formPageUpdateInputType = {
  formId: string;
  formPageId: string;
  name?: string;
  prevPageId?: string | undefined;
  nextPageId?: string | undefined;
};
