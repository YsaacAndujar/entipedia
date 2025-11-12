import { ClientsFormValues } from "@/lib/validations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useClientss = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await fetch("/api/clients");
      if (!res.ok) throw new Error("Error fetching clients");
      return res.json();
    },
  });
};

export function useCreateClients({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ClientsFormValues) => {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Error al crear el proyecto")
      return res.json()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] })
      toast.success("Proyecto creado correctamente")
      onSuccess?.()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Error al crear el proyecto")
    },
  })
}


