'use client';

import _ from 'lodash';
import { Box, Paper } from '@mui/material';
import Basic from './Basic';

import type { ModulesKey, ResumePaperProps, ResumeType } from '@lib/components/Resume/type';
import contentMap from '@lib/components/Resume/contentMap';
import commonStyles from '@lib/components/Resume/commonStyles';
import styles from './styles';
import ModuleTitle from './ModuleTitle';
import ContentWrapper from '@lib/components/Resume/components/ContentWrapper';
import buildModuleItems from '@lib/components/Resume/helpers/buildModuleItems';

const Empty = () => {
  return <div>empty</div>;
};

const ResumeTemplateStyle1 = ({ preview, data }: ResumePaperProps) => {
  const { module_order: moduleOrder, theme_color: themeColor = '#2065d1' } = data;
  const moduleItems = buildModuleItems(data, moduleOrder);

  console.log(moduleItems, "moduleItems", moduleOrder)

  return (
    <Paper sx={commonStyles.resumePaper} elevation={0}>
      <Box sx={styles.container}>
        <Box
          sx={{
            width: '20%',
            height: 0,
            borderTop: `8px solid ${themeColor}`,
            borderBottom: '0 solid transparent',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            margin: '0 auto',
          }}
        />
        <Basic data={data.resume_basic} />

        <Box sx={{ mt: 2 }}>
          {_.map(moduleItems, (item) => {
            const ContentComponent = contentMap[item.content_type]?.component || Empty;

            // @ts-ignore
            const details = item[`${item.key}_details`] || [];

            return (
              <Box
                key={`${item.content_type}-${item.id}`}
                sx={{
                  display: item.visible ? 'block' : 'none',
                  my: 1,
                }}
              >
                <ModuleTitle preview={preview} themeColor={themeColor} data={item} />
                <Box sx={{ my: 1 }}>
                  {details.map((li: any) => (
                    <ContentWrapper moduleName={item.key} data={li} key={li.id}>
                      <Box sx={{ my: 1 }}>
                        <ContentComponent preview={preview} data={li} />
                      </Box>
                    </ContentWrapper>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default ResumeTemplateStyle1;
