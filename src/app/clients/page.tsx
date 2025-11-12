"use client"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useClientss as useClients } from "@/hooks/clients";
import { Client } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ClientRow } from "./componetns/ClientRow";
import { CreateClient } from "./componetns/CreateClient";

export default function Page() {
    const { data: clients, isLoading, error } = useClients();

    if (isLoading) return <p>Cargando clientes...</p>;
    if (error) return <p>Error al cargar los clientes.</p>;
    return (
        <>
            <h1 className="text-3xl font-bold">
                Clientes
            </h1>
            <CreateClient />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Valor (DOP)</TableHead>
                        <TableHead>Desde</TableHead>
                        <TableHead>Hasta</TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients?.map((client: Client, idx: number) => (
                        <ClientRow key={idx} client={client} />
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-center space-x-2 mt-4">
                <ChevronLeft className="w-5 h-5 cursor-pointer" />
                <span className="px-3 py-1">1 de 2</span>
                <ChevronRight className="w-5 h-5 cursor-pointer" />
            </div>
        </>

    )
}