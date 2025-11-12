'use client';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useUploadFile } from "@/hooks/files";
import { FileFormValues, fileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const UploadFile = () => {
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, setValue, formState: { errors }, reset, getValues } = useForm<FileFormValues>({
        resolver: zodResolver(fileSchema),
    })

    const { mutate: uploadFile, isPending } = useUploadFile({
        onSuccess: () => {
            setOpen(false)
            reset()
        },
    })

    const [droppedFiles, setDroppedFiles] = useState<File[]>([])

const handleDrop = (files: File[]) => {
  if (files.length > 0) {
    setDroppedFiles(files)
    setValue("file", files[0]) 
  }
}

    const onSubmit = (data: FileFormValues) => {
        uploadFile(data)
    }

    return (
        <div className="flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md">
                        <PlusIcon strokeWidth={4} /> Subir archivo
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Subir Archivo</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" placeholder="Ej: Reporte mensual" {...register("name")} />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Input id="description" placeholder="Opcional" {...register("description")} />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label>Archivo</Label>
                            <Dropzone
                                maxFiles={1}
                                onDrop={handleDrop}
                                onError={(err) => toast.error(err.message)}
                                src={droppedFiles}
                            >
                                <DropzoneEmptyState />
                                <DropzoneContent />
                            </Dropzone>
                            {errors.file && <p className="text-sm text-red-500">{errors.file.message}</p>}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button" className="cursor-pointer">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-green-400 hover:bg-green-500 text-white cursor-pointer"
                            >
                                {isPending ? "Subiendo..." : "Guardar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
