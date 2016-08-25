import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import Inspector from 'redux-devtools-inspector';

const DevTools = createDevTools(
  <DockMonitor 
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-w"
    changeMonitorKey="ctrl-shift-m"
    defaultIsVisible={false}
    >
    <Inspector />
    <SliderMonitor keyboardEnabled />
    <LogMonitor />
  </DockMonitor>
);

export default DevTools;