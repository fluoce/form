import {
  FormFieldSlice,
  FormPageSlice,
  FormSlice,
  WorkspaceSlice,
} from "./slice";

export type ResponseType<T = unknown> = {
  statusCode?: number;
  success?: boolean;
  message?: string | [];
  data?: T & { message?: string };
};

export type RefreshResponse = ResponseType<{
  refreshToken: string;
  accessToken: string;
}>;

export type WorkspaceResponse = {
  message: string;
  workspace: WorkspaceSlice;
};

export type WorkspacesResponse = {
  message: string;
  workspaces: WorkspaceSlice[];
};

export type FormResponse = {
  message: string;
  form: FormSlice;
};

export type FormsResponse = {
  message: string;
  forms: FormSlice[];
};

export type FormPageResponse = {
  message: string;
  formPage: FormPageSlice;
};

export type FormPagesResponse = {
  message: string;
  formPages: FormPageSlice[];
};

export type FormFieldsResponse = {
  message: string;
  formFields: FormFieldSlice[];
};

export type FormFieldResponse = {
  message: string;
  formField: FormFieldSlice;
};
