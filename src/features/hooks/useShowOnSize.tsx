import { Grid, Popover } from 'antd';
import { Breakpoint } from 'antd/es/_util/responsiveObserve';
import React from 'react';

const useShowOnSize = () => {
  const { useBreakpoint } = Grid;
  const breakpoint = useBreakpoint();

  const returnOnBreakpoint = (value: any, fromBreakpoint: Breakpoint) => {
    return breakpoint[fromBreakpoint] ? value : undefined;
  };

  const truncateString = (text: string, maxLength: number, fromBreakpoint: Breakpoint, withPopover?: boolean) => {
    if (breakpoint[fromBreakpoint]) {
      return text;
    }

    const newText = text.substr(0, maxLength);
    if (withPopover) {
      return (
        <Popover content={text} placement={'bottom'}>
          <span>{newText}...</span>
        </Popover>
      );
    }
    return newText;
  };

  return { returnOnBreakpoint, truncateString };
};

export default useShowOnSize;
