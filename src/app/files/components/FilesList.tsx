import { Trash2 } from "lucide-react";

export const FilesList = ({ files }: { files: any[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <div
          key={file.name}
          className="flex items-center justify-between p-3 border rounded-md bg-background"
        >
          {/* Nombre y tamaño */}
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{file.name}.{file.fileType}</span>
            <span className="text-sm text-muted-foreground"></span>
          </div>

          {/* Botón eliminar */}
          <button
            onClick={() => console.log("Eliminar", file.name)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};