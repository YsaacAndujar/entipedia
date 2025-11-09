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

const files = [
    {
        name: "Informe de Ventas",
        description: "Reporte mensual de ventas",
        fileType: "PDF",
        createdAt: "2025-11-08",
    },
    {
        name: "Presentación Proyecto X",
        description: "Diapositivas del proyecto X",
        fileType: "PPTX",
        createdAt: "2025-10-30",
    },
    {
        name: "Lista de Clientes",
        description: "Archivo con todos los clientes activos",
        fileType: "XLSX",
        createdAt: "2025-11-01",
    },
    {
        name: "Contrato Empresa Y",
        description: "Contrato firmado con Empresa Y",
        fileType: "PDF",
        createdAt: "2025-09-20",
    },
    {
        name: "Imagen Producto Z",
        description: "Fotografía del producto Z",
        fileType: "JPG",
        createdAt: "2025-11-05",
    },
];


export const FileViewer = () => {
    const [mode, setMode] = useState("list")
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
                    <ChevronLeft className="w-5 h-5 cursor-pointer" />
                    <span className="px-3 py-1">1 de 2</span>
                    <ChevronRight className="w-5 h-5 cursor-pointer" />
                </div>
            </div>
        </>
    )
}
