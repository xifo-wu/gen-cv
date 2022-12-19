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
    component: () => <div></div>,
  },
  education2: {
    id: 'educationContent2',
    preview: () => <div></div>,
    component: () => <div></div>,
  },
};
// #endregion

export default {
  ...educationMap,
};
