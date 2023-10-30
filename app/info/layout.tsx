import { ReactNode } from "react";

export default function InfoLayout ({ children }: { children: ReactNode }) {

    return (
        <main className="flex flex-col w-[90%] lg:w-4/5 text-4xl gap-8 py-14">
            { children }
        </main>
    )
}