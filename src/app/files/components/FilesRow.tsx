
import { DeleteModal } from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import {
  TableCell,
  TableRow
} from "@/components/ui/table";
import { useDownloadFile } from "@/hooks/files";
import { Files } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Download } from "lucide-react";

export const FilesRow = ({ file }: { file: Files }) => {
  const { mutate: downloadFile, isPending } = useDownloadFile()

  return (
    <TableRow key={file.id}>
      <TableCell>{file.name}</TableCell>
      <TableCell>{file.description}</TableCell>
      <TableCell>{file.fileType}</TableCell>
      <TableCell>{formatDate(file.createdAt)}</TableCell>
      <TableCell>
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
      </TableCell>
    </TableRow>
  )
}
