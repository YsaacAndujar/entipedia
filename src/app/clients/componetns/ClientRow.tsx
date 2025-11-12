"use client"
import { DeleteModal } from "@/components/DeleteModal";
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
import { useUpdateClients } from "@/hooks/clients";
import { Client } from "@/lib/db";
import { ClientsFormValues, clientsSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
export const ClientRow = ({ client }: { client: Client }) => {
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);

    const { register, handleSubmit, setValue, watch, formState } = useForm<ClientsFormValues>({
        //@ts-ignore
        resolver: zodResolver(clientsSchema),
        defaultValues: {
            ...client,
            value: parseFloat(client.value),
            to: client.to ?? undefined,
        },
    });

    const { errors } = formState;

    const { mutate: updateClient, isPending } = useUpdateClients();

    const from = watch("from");
    const to = watch("to");

    const onSubmit = (data: ClientsFormValues) => {
        updateClient({ id: client.id, ...data });
    };

    const handleDelete = () => {
        console.log("Eliminar cliente", client.id);
    };
    return (
        <TableRow>
            <TableCell>
                <Input {...register("name")} defaultValue={client.name} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </TableCell>

            <TableCell>
                <Select
                    defaultValue={client.type}
                    onValueChange={(val) => setValue("type", val as ClientsFormValues["type"])}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="person">Persona</SelectItem>
                            <SelectItem value="company">Compañía</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </TableCell>

            <TableCell>
                <Input type="number" step="0.01" {...register("value")} defaultValue={client.value} />
                {errors.value && <p className="text-sm text-red-500">{errors.value.message}</p>}
            </TableCell>

            <TableCell>
                <Popover open={openFrom} onOpenChange={setOpenFrom}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-48 justify-between font-normal">
                            {from ? new Date(from).toLocaleDateString() : "Selecciona fecha"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={from ? new Date(from) : undefined}
                            onSelect={(d) => {
                                setValue("from", d ? d.toISOString().split("T")[0] : "");
                                setOpenFrom(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
                {errors.from && <p className="text-sm text-red-500">{errors.from.message}</p>}
            </TableCell>

            <TableCell>
                <Popover open={openTo} onOpenChange={setOpenTo}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-48 justify-between font-normal">
                            {to ? new Date(to).toLocaleDateString() : "Selecciona fecha"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={to ? new Date(to) : undefined}
                            onSelect={(d) => {
                                setValue("to", d ? d.toISOString().split("T")[0] : "");
                                setOpenTo(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
                {errors.to && <p className="text-sm text-red-500">{errors.to.message}</p>}
            </TableCell>

            <TableCell>
                <DeleteModal url={`api/clients/${client.id}`} queryKey={["clients"]} />
            </TableCell>

            <TableCell>
                <Button
                    type="button"
                    //@ts-ignore
                    onClick={() => handleSubmit(onSubmit)()}
                    disabled={isPending}
                    className="bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                >
                    {isPending ? "Guardando..." : "Guardar cambios"}
                </Button>
            </TableCell>
        </TableRow>
    );
}