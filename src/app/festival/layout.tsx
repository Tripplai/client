import { Metadata } from "next";

const logo = process.env.NEXT_PUBLIC_SERVICE_NAME;

export const metadata: Metadata = {
  title: `축제 / ${logo}`,
  description: `${logo} 에서 축제정보들을 확인해 보세요`,
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
