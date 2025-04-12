import { Row } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function CustomerRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            const rowItemId = row.getValue("id");
            console.log(row.getAllCells());
            router.push(`/customers/${rowItemId}/edit`);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const rowItemId = row.getValue("id");
            try {
              axios.delete(`/api/customers?id=${rowItemId}`).then((res) => {
                if (res.status === 200) {
                  toast({
                    title: "Customer deleted",
                    description: "Customer deleted successfully",
                    variant: "default",
                  });
                  new Promise((resolve) => setTimeout(resolve, 3000));
                  window.location.reload();
                } else {
                  toast({
                    title: "Error occurred",
                    description: `${(res.data as any).message}`,
                    variant: "destructive",
                  });
                  router.push("/customers");
                }
              });
            } catch (error) {
              toast({
                title: "Error occurred",
                description: `${(error as any).message}`,
                variant: "destructive",
              });
              router.push("/customers");
            }
          }}
        >
          <span className="text-red-500">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomerRowActions;
