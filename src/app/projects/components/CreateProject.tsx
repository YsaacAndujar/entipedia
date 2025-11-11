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
import { Textarea } from "@/components/ui/textarea"
import { ProjectPriority, ProjectStatus } from "@/db/schema"
import { useCreateProject } from "@/hooks/projects"
import { PRIORITY_LABELS, PROJECT_STATUS_LABELS } from "@/lib/utils"
import { ProjectFormValues, projectSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const CreateProject = () => {
    const [open, setOpen] = useState(false)
    const { mutate: createProject, isPending } = useCreateProject({
        onSuccess: () => {
            setOpen(false)
            reset()
        },
    })
    const onSubmit = (data: ProjectFormValues) => {
        createProject(data)
    }
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
    })

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
                                disabled={isPending}
                            >
                                {isPending ? "Guardando..." : "Guardar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
