'use client';

import _ from 'lodash';
import { Box, Paper } from '@mui/material';
import Basic from './Basic';
import helpers from '@lib/helpers';
import type { ModulesKey, ResumePaperProps, ResumeType } from '@lib/components/Resume/type';
import contentMap from '@lib/components/Resume/contentMap';
import commonStyles from '@lib/components/Resume/commonStyles';
import styles from './styles';
import ModuleTitle from './ModuleTitle';
import ContentWrapper from '@lib/components/Resume/ContentWrapper';

const Empty = () => {
  return <div>empty</div>;
};

const ResumeTemplateStyle1 = ({ preview, data }: ResumePaperProps) => {
  const { moduleOrder, themeColor = '#2065d1' } = data;
  const moduleItems = helpers.buildModuleItems(data, moduleOrder);

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
        <Basic themeColor={themeColor} data={data.resumeBasic} />

        <Box sx={{ mt: 2 }}>
          {_.map(moduleItems, (item) => {
            const ContentComponent = contentMap[item.contentType]?.component || Empty;
            // @ts-ignore
            const details = item[`${item.key}Details`];
            console.log(item, details," details")

            return (
              <Box
                key={`${item.contentType}-${item.id}`}
                sx={{
                  display: item.visible ? 'block' : 'none',
                  my: 1,
                }}
              >
                <ModuleTitle preview={preview} themeColor={themeColor} data={item} />
                <Box sx={{ my: 1 }}>
                  {details.map((li: any) => (
                    <ContentWrapper moduleName={item.key} data={li} key={li.id}>
                      <Box sx={{ px: 3, my: 1 }}>
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
