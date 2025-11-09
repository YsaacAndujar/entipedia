"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { ProjectPriority, ProjectStatus } from "@/db/schema"
import { PRIORITY_LABELS, PROJECT_STATUS_LABELS } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { ProjectFormValues, projectSchema } from "@/lib/validations"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"

export const CreateProject = () => {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
    })

    const onSubmit = async (data: ProjectFormValues) => {
        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                toast.error('Error al crear el proyecto')
                return
            }
            await queryClient.invalidateQueries({ queryKey: ["projects"] })
            setOpen(false)
            reset()
            toast.success('Proyecto creado correctamente')
        } catch (error) {
            toast.error('Error al crear el proyecto')
            console.error(error)
        }
    }

    return (
        <div className="flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md">
                        <PlusIcon strokeWidth={4} /> Nuevo proyecto
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Crear Proyecto</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>Nombre</Label>
                            <Input {...register("name")} />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label>Descripción</Label>
                            <Textarea {...register("description")} />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label>Estatus</Label>
                            <Select
                                onValueChange={(value: (typeof ProjectStatus.enumValues)[number]) => setValue("status", value, { shouldTouch: true })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {ProjectStatus.enumValues.map((value) => (
                                            <SelectItem key={value} value={value}>
                                                {PROJECT_STATUS_LABELS[value]}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-red-500 text-sm">{errors.status.message}</p>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Label>Prioridad</Label>
                            <Select
                                onValueChange={(value: (typeof ProjectPriority.enumValues)[number]) => setValue("priority", value, { shouldTouch: true })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona la prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {ProjectPriority.enumValues.map((value) => (
                                            <SelectItem key={value} value={value}>
                                                {PRIORITY_LABELS[value]}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.priority && (
                                <p className="text-red-500 text-sm">{errors.priority.message}</p>
                            )}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="cursor-pointer" variant="outline" onClick={() => reset()}>Cancelar</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Guardando..." : "Guardar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
