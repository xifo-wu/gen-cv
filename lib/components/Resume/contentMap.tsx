import CommonContent1 from "./components/CommonContent1";
import Education2 from "./components/Education/Education2";

export type ContentType = {
  id: string;
  preview: React.FC;
  component: React.FC<any>;
};

// #region 教育经历模块
export const educationMap: Record<string, ContentType> = {
  education1: {
    id: 'educationContent1',
    preview: () => <div></div>,
    component: CommonContent1,
  },
  education2: {
    id: 'educationContent2',
    preview: () => <div></div>,
    component: Education2,
  },
};
// #endregion

export default {
  ...educationMap,
};
