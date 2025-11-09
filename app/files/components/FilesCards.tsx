import { Trash2 } from 'lucide-react';
import React from 'react'

export const FilesCards = ({files}:{files: any[]}) => {
 return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {files.map((file) => (
        <div
          key={file.name}
          className="p-4 border rounded-lg shadow-sm flex flex-col justify-between bg-background hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-foreground">{file.name}</span>
            <span className="text-sm text-muted-foreground">{file.description}</span>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="mr-2">{file.fileType}</span>
              <span>{new Date(file.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button
              onClick={() => console.log("Eliminar", file.name)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
