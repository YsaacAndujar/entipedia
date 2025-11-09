"use client"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ChevronDownIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { CreateClient } from "./componetns/CreateClient";
type ClientItem = {
    name: string;
    type: "person" | "company"
    value: number;
    from: string;
    to: string;
};
const clients: ClientItem[] = [
    {
        name: "Juan Pérez",
        type: "person",
        value: 50000,
        from: "2025-01-01",
        to: "2025-06-30"
    },
    {
        name: "Compañía XYZ",
        type: "company",
        value: 150000,
        from: "2025-02-15",
        to: "2025-12-31"
    },
    {
        name: "María Rodríguez",
        type: "person",
        value: 75000,
        from: "2025-03-01",
        to: "2025-09-30"
    },
    {
        name: "Empresa ABC",
        type: "company",
        value: 200000,
        from: "2025-04-01",
        to: "2025-10-15"
    },
    {
        name: "Carlos López",
        type: "person",
        value: 120000,
        from: "2025-05-01",
        to: "2025-11-30"
    }
];
//todo: refactorize
export default function Page() {
    //todo: fix state, probably on refactorize
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
        <>
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
                    {clients.map((client, idx) => (
                        <TableRow key={client.name}>
                            <TableCell ><Input id={`${idx}-name`} name={`${idx}-name`} defaultValue={client.name} /></TableCell>
                            <TableCell>
                                <Select>
                                    <SelectTrigger id={`${idx}-type`} className="w-full">
                                        <SelectValue placeholder="Seleciona un tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={'person'}>Persona</SelectItem>
                                            <SelectItem value={'company'}>Compañía</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Input
                                    id={`${idx}-value`}
                                    name={`${idx}-value`}
                                    defaultValue={client.value}
                                    type="number"
                                />
                            </TableCell>
                            <TableCell>{<Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-48 justify-between font-normal"
                                    >
                                        {date ? date.toLocaleDateString() : "Select date"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setDate(date)
                                            setOpen(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>}</TableCell>
                            <TableCell>{<Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-48 justify-between font-normal"
                                    >
                                        {date ? date.toLocaleDateString() : "Select date"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setDate(date)
                                            setOpen(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>}</TableCell>
                            <TableCell>
                                <Button type="submit" className="bg-red-400 hover:bg-red-500 cursor-pointer text-white text-md">Eliminar</Button>
                            </TableCell>
                            <TableCell>
                                <Button type="submit" className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md">Guardar cambios</Button>
                            </TableCell>
                        </TableRow>
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