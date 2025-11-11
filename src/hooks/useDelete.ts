import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export function useDelete() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ url, queryKey }: { url: string, queryKey: string[] }) => {
            const res = await fetch(url, {
                method: "DELETE",
            })
            if (!res.ok) throw new Error("Error al eliminar el registro")
            await queryClient.invalidateQueries({ queryKey })
            toast.success("Registro eliminado correctamente")
            return true
        },
        onError: (error) => {
            console.error(error)
            toast.error("Error al eliminar el registro")
        },
    })
}