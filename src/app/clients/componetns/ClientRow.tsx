"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import { Client } from "@/lib/db";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
export const ClientRow = ({ client }: { client: Client }) => {
    const [openFrom, setOpenFrom] = useState(false)
    const [openTo, setOpenTo] = useState(false)
    return (
        <TableRow key={client.name}>
            <TableCell ><Input defaultValue={client.name} /></TableCell>
            <TableCell>
                <Select>
                    <SelectTrigger className="w-full" defaultValue={client.type}>
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
                    defaultValue={client.value}
                    type="number"
                />
            </TableCell>
            <TableCell>{<Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-48 justify-between font-normal"
                    >
                        {client.from || "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={new Date(client.from)}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setOpenFrom(false)
                        }}
                    />
                </PopoverContent>
            </Popover>}</TableCell>
            <TableCell>{<Popover open={openTo} onOpenChange={setOpenTo}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-48 justify-between font-normal"
                    >
                        {client.to || "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={client.to ? new Date(client.to) : undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setOpenTo(false)
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
    )
}
