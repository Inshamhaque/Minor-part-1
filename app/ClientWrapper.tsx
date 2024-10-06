// ClientWrapper.tsx
'use client';
import { RecoilRoot } from 'recoil';
import { Appbar } from '@/components/Appbar';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      {/* <Appbar /> */}
      <main className="min-h-screen">{children}</main>
    </RecoilRoot>
  );
};

export default ClientWrapper;
