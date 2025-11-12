"use client"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useClients } from "@/hooks/clients";
import { Client } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ClientRow } from "./componetns/ClientRow";
import { CreateClient } from "./componetns/CreateClient";

export default function Page() {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useClients({ page, limit: 10 });
    if (isLoading) return <p>Cargando clientes...</p>;
    if (error) return <p>Error al cargar los clientes.</p>;
    const { data: clients, pagination } = data
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
                    {clients?.map((client: Client) => (
                        <ClientRow key={client.id} client={client} />
                    ))}
                </TableBody>
            </Table>
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
        </>
    )
}