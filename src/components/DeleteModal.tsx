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

export const DeleteModal = ({ }: { id: string | number, url: string }) => {
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
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600 transition-colors cursor-pointer">Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
