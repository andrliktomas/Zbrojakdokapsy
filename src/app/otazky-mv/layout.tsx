import { MvSubnav } from "@/components/mv/MvSubnav";
import { MvAttribution } from "@/components/mv/MvAttribution";

export default function MvLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <MvSubnav />
      {children}
      <MvAttribution />
    </div>
  );
}
