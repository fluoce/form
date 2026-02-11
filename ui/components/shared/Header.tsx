import { ReactElement } from "react"

export const Header = ({ type, title, icon }: { type?: string, title: string, icon?: ReactElement }) => {
    return (
        <div className="w-fit ">
            <div className=" flex items-center gap-2 text-3xl text-muted-foreground">
                {icon}
                <span className=" font-semibold truncate">{title}</span>
            </div>
            <h1 className="text-xs font-medium text-muted-foreground truncate">{type}</h1>
        </div>
    )
}
