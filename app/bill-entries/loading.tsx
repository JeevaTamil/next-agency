import { Loader2 } from "lucide-react";

const BillEntriesLoadingPage = () => {
  return (
    <div>
      <Loader2 className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

export default BillEntriesLoadingPage;
