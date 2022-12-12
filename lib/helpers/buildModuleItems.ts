import _ from 'lodash';
import { ModulesKey, ResumeType } from '@lib/components/Resume/type';

const buildModuleItems = (data: ResumeType, moduleOrder: string) => {
  const moduleOrderArray = (moduleOrder.split(',') as (ModulesKey | 'resumeBasic')[]) || [];
  const filteredModule = _.filter(moduleOrderArray, (item) => item !== 'resumeBasic');

  return _.map(filteredModule, (item) => {
    return {
      ...data[item],
      key: item,
    }
  }).filter(
    (item) => !!item,
  ) as ResumeType[ModulesKey][];
};

export default buildModuleItems;
