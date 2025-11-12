"use client"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { FilesList } from "./FilesList"
import { FilesCards } from "./FilesCards"
import { FilesTable } from "./FilesTable"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useFiles } from "@/hooks/files"

export const FileViewer = () => {
    const [mode, setMode] = useState("list")
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useFiles({ page, limit: 10 });
    if (isLoading) return <p>Cargando clientes...</p>;
    if (error) return <p>Error al cargar los clientes.</p>;
    const { data: files, pagination } = data
    return (
        <>
            <div className="flex flex-col gap-4">
                <Label htmlFor="view-mode">Modo de vista</Label>
                <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger id="view-mode" className="w-[180px]" >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="list">Lista</SelectItem>
                            <SelectItem value="cards">Cards</SelectItem>
                            <SelectItem value="table">Tabla</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {
                    mode == "list" && <FilesList files={files} />
                }
                {
                    mode == "cards" && <FilesCards files={files} />
                }
                {
                    mode == "table" && <FilesTable files={files} />
                }
                <div className="flex items-center justify-center space-x-2 mt-4">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page <= 1}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5 cursor-pointer" />
                    </button>

                    <span className="px-3 py-1 text-sm font-medium">
                        {pagination.page} de {pagination.totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setPage((p) =>
                                p < pagination.totalPages ? p + 1 : pagination.totalPages
                            )
                        }
                        disabled={page >= pagination.totalPages}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>
            </div>
        </>
    )
}
