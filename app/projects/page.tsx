
import { CreateProject } from "./components/CreateProject"
import { KanbanWrapper } from "./components/KanbanWrapper";

export default function Page() {
    return (
        <>
            <h1 className="text-3xl font-bold">
                Proyectos
            </h1>

            <div className="space-y-4">

                <CreateProject />
                <KanbanWrapper />
            </div>
        </>
    );
}

