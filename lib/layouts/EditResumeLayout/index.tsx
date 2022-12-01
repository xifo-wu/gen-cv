import React from "react";
import { useRouter } from "next/router";
import useApi from "@lib/hooks/useApi";

interface Props {
  children?: React.ReactNode;
}

const EditResumeLayout = ({ children }: Props) => {
  const router = useRouter();
  const { query } = router;

  // TODO: Fix any type
  const { data: user = {}, error, loading } = useApi<any>("/api/v1/users/current");
  const {
    data: resumeData,
    error: resumeError,
    loading: resumeLoading,
  } = useApi<any>(
    query["resume-id"] ? `/api/v1/resumes/${query["resume-id"]}` : null
  );

  console.log(resumeLoading, loading);
  if (loading || resumeLoading) {
    // TODO: Add Loading Component;
    return <>Loading</>;
  }

  if (error || resumeError) {
    // TODO: Solution Error
    return <>获取数据出错</>;
  }

  if (user.username !== query.username) {
    // TODO: Add 403 Component
    return <>无权修改</>;
  }

  return <>{children}</>;
};

export default EditResumeLayout;
