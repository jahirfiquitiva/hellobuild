import React, { FC, ReactNode, ReactChild, useState } from 'react';

import { Tab, TabContent, TabList, TabsContainer } from './styled';

interface TabsProps {
  tabsCount: number;
  initialTab?: number;
  getTabTitle?: (index: number) => void;
  getTabChild?: (index: number) => ReactNode | ReactChild;
  getTabPanelId?: (index: number) => string;
  onTabChanged?: (newTabIndex: number) => void;
}

export const Tabs: FC<TabsProps> = (props) => {
  const {
    initialTab = 0,
    tabsCount,
    getTabTitle,
    getTabChild,
    getTabPanelId,
    onTabChanged,
  } = props;
  const [currentTab, setCurrentTab] = useState<number>(initialTab || 0);
  return (
    <TabsContainer>
      <TabList
        role={'tablist'}
        className={
          'divide-x divide-black divide-opacity-10 border border-black border-b-0 max-w-max rounded-t-lg'
        }
      >
        {Array.from(Array(tabsCount).keys()).map((item, index) => {
          return (
            <Tab
              key={`tab-${index}`}
              role={'tab'}
              aria-selected={currentTab === item}
              onClick={() => {
                setCurrentTab(item);
                onTabChanged?.(item);
              }}
            >
              {getTabTitle?.(item) || `Tab ${item + 1}`}
            </Tab>
          );
        })}
      </TabList>
      <TabContent
        role={'tabpanel'}
        id={getTabPanelId?.(currentTab) || `tab-${currentTab + 1}`}
      >
        {getTabChild?.(currentTab)}
      </TabContent>
    </TabsContainer>
  );
};
