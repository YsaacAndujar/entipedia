import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react'
import { Button } from "./ui/button"

export const DeleteModal = ({ onDelete, isPending }: { onDelete: ()=> void, isPending: boolean }) => {

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600 transition-colors cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Seguro que desa eliminar este registro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <Button
                            onClick={onDelete}
                            disabled={isPending}
                            className="bg-red-500 hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Eliminando..." : "Eliminar"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

