import React from "react";

const PaymentsPage = ({ params }: { params: { id: string } }) => {
  return <div>PaymentsPage {params.id}</div>;
};

export default PaymentsPage;
