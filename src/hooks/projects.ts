import { ProjectFormValues } from "@/lib/validations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Error fetching projects");
      return res.json();
    },
  });
};

export function useCreateProject({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Error al crear el proyecto")
      return res.json()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Proyecto creado correctamente")
      onSuccess?.()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Error al crear el proyecto")
    },
  })
}

