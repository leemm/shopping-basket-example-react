import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <Theme>
      <Wrapper catalogue={ __CATALOGUE__ } />
    </Theme>
  );
}

export default App;
