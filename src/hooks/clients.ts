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
      if (!res.ok) throw new Error("Error al crear el cliente")
      return res.json()
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] })
      toast.success("Cliente creado correctamente")
      onSuccess?.()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Error al crear el cliente")
    },
  })
}

export function useUpdateClients() {
  return useMutation({
    mutationFn: async ({id,...data}:  & {id: string | number},) => {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Error al actualizar el cliente")
      return res.json()
    },
    onSuccess: async () => {
      toast.success("Cliente actualizado correctamente")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Error al actualizar el cliente")
    },
  })
}


