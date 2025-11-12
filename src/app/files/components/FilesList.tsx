import { Files } from "@/lib/db";
import { FilesListItem } from "./FilesListItem";

export const FilesList = ({ files }: { files: Files[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {files.map((file) => (
        <FilesListItem file={file} key={file.id}/>
      ))}
    </div>
  )
}