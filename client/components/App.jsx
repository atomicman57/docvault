import React from 'react';
import NavigationBar from './includes/NavigationBar.jsx';
import Footer from './includes/Footer.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
