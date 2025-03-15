import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddBankForm from "./components/add-bank-form";

const NewBankPage = async () => {
  

  return (
    <Card className="max-w-md">
      <CardHeader>Add Bank</CardHeader>
      <CardContent>
        <AddBankForm />
      </CardContent>
    </Card>
  );
};

export default NewBankPage;
