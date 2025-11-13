import { DeleteModal } from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import { useDownloadFile } from "@/hooks/files";
import { Files } from "@/lib/db";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Download, Trash2 } from "lucide-react";

export const FilesListItem = ({ file }: { file: Files }) => {
    const { mutate: downloadFile, isPending } = useDownloadFile()
    return (
        <div
            key={file.id}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-background shadow-sm"
        >
            <div className="flex flex-col">
                <span className="font-semibold text-foreground">{file.name}</span>
                {file.description && (
                    <span className="text-sm text-muted-foreground">
                        {file.description}
                    </span>
                )}
                <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                    <span>{file.fileType}</span>
                    <span>•</span>
                    <span>
                        {format(new Date(file.createdAt), "dd MMM yyyy, HH:mm", { locale: es })}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-3 md:mt-0">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(file.key)}
                    disabled={isPending}
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                    <Download className="w-4 h-4 mr-1" /> {isPending ? "Descargando..." : "Descargar"}
                </Button>
                <DeleteModal queryKey={["files"]} url={`api/files/${file.id}`} />
            </div>
        </div>
    )
}