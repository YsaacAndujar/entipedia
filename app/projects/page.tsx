"use client"

import { CreateProject } from "./componetns/CreateProject"
import dynamic from 'next/dynamic'
const Kanban = dynamic(() => import('../projects/componetns/Kanban').then(m => m.Kanban), { ssr: false })

export default function Page() {
    return (
        <>
            <h1 className="text-3xl font-bold">
                Proyectos
            </h1>

            <div className="space-y-4">

                <CreateProject />
                <Kanban />
            </div>
        </>
    );
}

