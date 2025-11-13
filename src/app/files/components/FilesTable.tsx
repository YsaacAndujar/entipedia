
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Files } from "@/lib/db";
import { FilesRow } from "./FilesRow";

export const FilesTable = ({ files }: { files: Files[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Tipo de archivo</TableHead>
          <TableHead>Fecha de creación</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <FilesRow file={file} key={file.id} />
        ))}
      </TableBody>
    </Table>

  )
}
