export type ResponseType<T = unknown> = {
    statusCode?: number;
    success?: boolean;
    message?: string;
    data?: T & { message?: string };
};

export type RefreshResponse = ResponseType<{ refreshToken?: string; accessToken?: string }>;