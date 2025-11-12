import { FileFormValues, fileSchema } from '@/lib/validations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useUploadFile({ onSuccess }: { onSuccess?: () => void }) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: FileFormValues) => {
            const parsed = fileSchema.safeParse(data)
            if (!parsed.success) {
                const message =
                    Object.values(parsed.error.flatten().fieldErrors)
                        .flat()
                        .join(", ") || "Datos inválidos"
                throw new Error(message)
            }

            const formData = new FormData()
            formData.append("name", parsed.data.name)
            if (parsed.data.description) formData.append("description", parsed.data.description)
            formData.append("file", parsed.data.file)

            const res = await fetch("/api/files", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || "Error subiendo archivo")
            }

            return res.json()
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["files"] })
            toast.success("Archivo subido correctamente")
            onSuccess?.()
        },
        onError: (error) => {
            console.error(error)
            toast.error(error instanceof Error ? error.message : "Error al subir archivo")
        },
    })
}

export const useFiles = ({ page = 1, limit = 10 }: {page: number, limit:number}) => {
  return useQuery({
    queryKey: ["files", page, limit],
    queryFn: async () => {
      const res = await fetch(`/api/files?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Error fetching files");
      return res.json();
    },
  });
};