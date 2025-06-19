import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store'; // adjust path

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
