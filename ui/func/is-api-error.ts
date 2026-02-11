export function isApiError(data: any) {
    return (
        data &&
        (data.success === false ||
            (typeof data.statusCode === "number" && data.statusCode >= 400))
    );
}