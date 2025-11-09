
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

export const FilesTable = ({files}:{files: any[]}) => {
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
    {files.map((file, idx) => (
      <TableRow key={file.name}>
        <TableCell>{file.name}</TableCell>
        <TableCell>{file.description}</TableCell>
        <TableCell>{file.fileType}</TableCell>
        <TableCell>{file.createdAt}</TableCell>
        <TableCell>
          <Button
            type="button"
            className="bg-red-400 hover:bg-red-500 cursor-pointer text-white text-md"
            onClick={() => console.log("Eliminar", file.name)}
          >
            Eliminar
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

  )
}
