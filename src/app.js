import React from 'react';
import styles from './app.less';
import Roadmap from './containers/Roadmap';
import { RoadmapContextProvider } from './context';


const App = () => {
  return (
    <div className={styles.app}>
      <RoadmapContextProvider>
        <div className="container-fluid pl-0 pr-0 ml-0 mr-0">
          <Roadmap />
        </div>
      </RoadmapContextProvider>
    </div>
  );
};

export default App;
