// "use client";
// import { useEffect, useState, useRef, useCallback } from "react";

// function isApiError(data: any) {
//     return (
//         data &&
//         (data.success === false ||
//             (typeof data.statusCode === "number" && data.statusCode >= 400))
//     );
// }

// export function useQuery<TResult, TSelected = TResult>(
//     queryFn: () => Promise<TResult>,
//     options?: {
//         enabled?: boolean;
//         deps?: any[];
//         select?: (data: TResult) => TSelected;
//     }
// ) {
//     const queryFnRef = useRef(queryFn);
//     queryFnRef.current = queryFn;

//     const inFlightRef = useRef(false);

//     const [data, setData] = useState<TSelected | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isError, setIsError] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const execute = useCallback(async () => {
//         if (inFlightRef.current) return;

//         inFlightRef.current = true;
//         setIsLoading(true);
//         setIsError(false);
//         setError(null);

//         try {
//             const result: any = await queryFnRef.current();

//             if (isApiError(result)) {
//                 const errMsg =
//                     Array.isArray(result.message)
//                         ? result.message[0]
//                         : result.message || "Something went wrong";

//                 setIsError(true);
//                 setError(errMsg);
//                 setData(null);
//                 return;
//             }

//             const finalData = options?.select
//                 ? options.select(result)
//                 : (result as any);

//             setData(finalData);
//         } catch (err) {
//             setIsError(true);
//             setError(typeof err === "string" ? err : "Something went wrong");
//             setData(null);
//         } finally {
//             inFlightRef.current = false;
//             setIsLoading(false);
//         }
//     }, [options?.select]);

//     useEffect(() => {
//         if (options?.enabled === false) return;
//         execute();
//     }, [options?.enabled, ...(options?.deps ?? [])]);

//     return {
//         data,
//         isLoading,
//         isError,
//         error,
//         refetch: execute,
//     };
// }
