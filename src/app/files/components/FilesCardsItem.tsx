import { DeleteModal } from '@/components/DeleteModal'
import { Button } from '@/components/ui/button'
import { useDownloadFile } from '@/hooks/files'
import { Files } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { Download } from 'lucide-react'

export const FilesCardsItem = ({ file }: { file: Files }) => {
    const { mutate: downloadFile, isPending } = useDownloadFile()

    return (
        <div
            key={file.id}
            className="p-4 border rounded-lg shadow-sm flex flex-col justify-between bg-background hover:shadow-md transition-shadow"
        >
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">{file.name}</span>
                <span className="text-sm text-muted-foreground">{file.description}</span>
                <div className="text-xs text-muted-foreground mt-1">
                    <span className="mr-2">{file.fileType}</span>
                    <span>{formatDate(file.createdAt)}</span>
                </div>
            </div>

            <div className="flex justify-end mt-3 gap-5">
                <button
                    className="text-red-500 hover:text-red-600"
                >
                    <DeleteModal queryKey={["files"]} url={`api/files/${file.id}`} />
                </button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(file.key)}
                    disabled={isPending}
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                    <Download className="w-4 h-4 mr-1" /> {isPending ? "Descargando..." : "Descargar"}
                </Button>
            </div>
        </div>
    )
}
