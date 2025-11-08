import { CreateProject } from "./componetns/CreateProject"
import { Kanban } from "./componetns/Kanban";

export default function Page() {
    return (
        <div className="space-y-4">
            <CreateProject />
            <Kanban />
        </div>
    );
}

