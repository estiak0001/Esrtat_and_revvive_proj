import {
  Award,
  BadgeCheck,
  Users,
  Building2,
  Scale,
  FileText,
  Globe,
  Landmark,
  ShieldCheck,
  Heart,
  Home,
  Star,
  Target,
  Handshake,
  type LucideProps,
} from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  Award,
  BadgeCheck,
  Users,
  Building2,
  Scale,
  FileText,
  Globe,
  Landmark,
  ShieldCheck,
  Heart,
  Home,
  Star,
  Target,
  Handshake,
};

interface IconProps extends LucideProps {
  name: string;
}

export default function Icon({ name, ...props }: IconProps) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component {...props} />;
}
