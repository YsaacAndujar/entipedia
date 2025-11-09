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
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const UploadFile = () => {
    const [files, setFiles] = useState<File[] | undefined>();
    const handleDrop = (files: File[]) => {
        setFiles(files);
    };
    return (
        <div className="flex justify-end">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md">
                        <PlusIcon strokeWidth={4} />Subir archivo
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Subir Archivo</DialogTitle>
                    </DialogHeader>
                    <Dropzone
                        maxFiles={1}
                        onDrop={handleDrop}
                        //TODO: alert on error
                        onError={console.error}
                        src={files}
                    >
                        <DropzoneEmptyState />
                        <DropzoneContent />
                    </Dropzone>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md">Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
