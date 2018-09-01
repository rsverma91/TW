import React, { PureComponent } from 'react';

// Components
import ThoughtWorks from './components/ThoughtWorks/ThoughtWorks.jsx';

// Component styles
require('./app.scss');
class App extends PureComponent {
    render() {
        return (
            <ThoughtWorks />
        );
    }
}
export default App;