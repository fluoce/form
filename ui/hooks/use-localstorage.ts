
export default function useLocalStorage() {

    const getValue = (key: string) => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(key);
    }

    const setValue = ({ key, data }: { key: string, data: any }) => {
        localStorage.setItem(key, JSON.stringify(data));
    }

    const removeValue = (key: string) => {
        if (typeof window === "undefined") return null;
        return localStorage.removeItem(key);
    }

    return {
        getValue,
        setValue,
        removeValue
    }
}