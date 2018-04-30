import React from 'react';

import SetTree from '../containers/SetTree.jsx';
import ShowTree from '../containers/ShowTree.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <ShowTree />
                <SetTree relative={false} />
            </div>
        );
  }
}
