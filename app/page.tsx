import { ModeToggle } from "@/components/mode-toggle";
import { Box } from "@radix-ui/themes";

export default function Home() {
  return (
    <Box className="p-5">
      <ModeToggle />
    </Box>
  );
}
