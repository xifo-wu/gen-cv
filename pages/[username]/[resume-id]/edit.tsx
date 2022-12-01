import EditResumeLayout from "@lib/layouts/EditResumeLayout";
import React from "react";

const EditResumePage = () => {
  return <div>EditResumePage</div>;
};

EditResumePage.getLayout = function getLayout(page: React.ReactElement) {
  return <EditResumeLayout>{page}</EditResumeLayout>;
};

export default EditResumePage;
