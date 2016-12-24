import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// const { createDevTools } = reduxdev;

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-t"
               changePositionKey="ctrl-r"
               defaultIsVisible={false}>
    <LogMonitor/>
  </DockMonitor>,
);
