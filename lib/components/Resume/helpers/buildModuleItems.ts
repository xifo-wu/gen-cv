import _ from 'lodash';
import { ModulesKey, ResumeType } from '@lib/components/Resume/type';

const buildModuleItems = (data: ResumeType, moduleOrder: string) => {
  const filteredModule = _.filter(moduleOrder.split(','), (item) => item !== 'resume_basic') as ModulesKey[];

  return _.map(filteredModule, (item) => {
    return {
      ...data[item],
      key: item,
    };
  }).filter((item) => !!item) as ResumeType[ModulesKey][];
};

export default buildModuleItems;
