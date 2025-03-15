import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddCustomerForm from "../components/add-customer-form";

const NewCustomerPage = () => {
  return (
    <Card className="max-w-5xl">
      <CardHeader>Add Customer</CardHeader>
      <CardContent>
        <AddCustomerForm />
      </CardContent>
    </Card>
  );
};

export default NewCustomerPage;
