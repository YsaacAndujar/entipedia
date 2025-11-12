"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { ChevronDownIcon, PlusIcon } from "lucide-react"
import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useCreateClients } from "@/hooks/clients"
import { ClientsFormValues, clientsSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const CreateClient = () => {
    const [open, setOpen] = useState(false)
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch
    } = useForm<ClientsFormValues>({
        //@ts-ignore
        resolver: zodResolver(clientsSchema),
    });
    const from = watch("from");
    const to = watch("to");

    const { mutate: createClients, isPending } = useCreateClients({
        onSuccess: () => {
            setOpen(false);
            reset();
        },
    });

    return (
        <div className="flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md">
                        <PlusIcon strokeWidth={4} />Nuevo Cliente
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Crear Cliente</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit((data:any) => createClients(data))} className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>Nombre</Label>
                            <Input id="name" {...register("name")} placeholder="Nombre del cliente" />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label>Tipo</Label>
                            <Select onValueChange={(value) => setValue("type", value as "person" | "company")}>
                                <SelectTrigger id="type" className="w-full">
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
                        </div>

                        <div className="grid gap-3">
                            <Label>Valor</Label>
                            <Input id="value" type="number" step="0.01" {...register("value")} placeholder="Ej: 1500" />
                            {errors.value && <p className="text-sm text-red-500">{errors.value.message}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label>Desde</Label>
                            <Popover open={openFrom} onOpenChange={setOpenFrom}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between font-normal"
                                    >
                                        {from ? new Date(from).toLocaleDateString() : "Selecciona una fecha"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={from ? new Date(from) : undefined}
                                        onSelect={(date) => {
                                            setValue("from", date ? date.toISOString().split("T")[0] : ""); // formato YYYY-MM-DD
                                            setOpenFrom(false);
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.from && <p className="text-sm text-red-500">{errors.from.message}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label>Hasta</Label>
                            <Popover open={openTo} onOpenChange={setOpenTo}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between font-normal"
                                    >
                                        {to ? new Date(to).toLocaleDateString() : "Selecciona una fecha (opcional)"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={to ? new Date(to) : undefined}
                                        onSelect={(date) => {
                                            setValue("to", date ? date.toISOString().split("T")[0] : "");
                                            setOpenTo(false);
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.to && <p className="text-sm text-red-500">{errors.to.message}</p>}

                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => reset()}>Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending} className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md">
                                {isPending ? "Guardando..." : "Guardar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
