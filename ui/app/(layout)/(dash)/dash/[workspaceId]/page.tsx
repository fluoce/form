import CodeBlock from "@/components/shared/CodeBlock";
import { Header } from "@/components/shared/Header";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";

export default async function Dash() {
    return (
        <Wrapper>
            <Header title="Form Fluoce" />
            <div className="grid grid-cols-1 sm:grid-cols-2 items-start justify-start gap-8 ">
                <div className="flex flex-col gap-3 ">
                    <h3 className="text-lg">Developer quickstart</h3>
                    <p className="text-sm text-muted-foreground">Make your first API request in minutes. Learn the basics of the Form Fluoce.</p>
                    <Button className="w-fit rounded-full px-4 h-10">
                        Get Started
                    </Button>
                </div>
                <div>
                    <CodeBlock />
                </div>
            </div>
        </Wrapper>
    )
}