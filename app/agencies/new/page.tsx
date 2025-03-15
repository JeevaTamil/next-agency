import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddAgencyForm from "./components/add-agency-form";

const NewAgencyPage = async () => {
  return (
    <Card className="max-w-md">
      <CardHeader>Add Agency</CardHeader>
      <CardContent>
        <AddAgencyForm />
      </CardContent>
    </Card>
  );
};

export default NewAgencyPage;
