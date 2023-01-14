import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { ResumeModuleCommonDetail } from './type';

interface Props {
  data: ResumeModuleCommonDetail;
}

// 通用的内容展示
// 只展示 content。
const CommonContent1 = ({ data }: Props) => {
  const content = data.desc;

  return (
    <ReactMarkdown children={content} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />
  );
};

export default CommonContent1;
