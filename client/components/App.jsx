import React from 'react';
import NavigationBar from './NavigationBar.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        {/*<NavigationBar />*/}
        {this.props.children}
      </div>
    );
  }
}

export default App;
