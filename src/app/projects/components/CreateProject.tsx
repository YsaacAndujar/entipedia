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
import { projectStatuses } from "@/utils/project"
import { PlusIcon } from "lucide-react"

export const CreateProject = () => {
    return (
        <div className="flex justify-end">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-green-400 hover:bg-green-500 cursor-pointer text-white text-md">
                        <PlusIcon strokeWidth={4} />Nuevo proyecto
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Crear Proyecto</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label >Nombre</Label>
                            <Input id="name" name="name" />
                        </div>
                        <div className="grid gap-3">
                            <Label >Descripción</Label>
                            <Input id="description" name="description" />
                        </div>
                        <div className="grid gap-3">
                            <Label>Estatus</Label>
                            <Select>
                                <SelectTrigger id="status" className="w-full">
                                    <SelectValue placeholder="Seleciona un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            ...projectStatuses.map(({ id, name }) => (<SelectItem value={id}>{name}</SelectItem>))
                                        }

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label >Prioridad</Label>
                            <Select>
                                <SelectTrigger id="priority" className="w-full">
                                    <SelectValue placeholder="Seleciona la prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="high">Alta</SelectItem>
                                        <SelectItem value="medium">Media</SelectItem>
                                        <SelectItem value="low">Baja</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
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
