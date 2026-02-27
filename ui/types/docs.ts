export type PageTreeItem = {
    id: string;
    slug: string[];
    title?: string;
    children: PageTreeItem[];
};