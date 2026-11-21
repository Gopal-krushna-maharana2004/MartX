import './globals.css';
import { DataProvider } from '../components/DataContext';

export const metadata = { title: 'MartX — Company workspace', description: 'MartX company management workspace demo' };
export default function RootLayout({ children }) {
  return <html lang="en"><body><DataProvider>{children}</DataProvider></body></html>;
}
