import { 
  Video as Youtube, 
  Camera as Instagram, 
  Mail, 
  Link as LinkIcon, 
  Smile,
  X,
  Menu,
  Play,
  Video as VideoIcon,
  Film,
  Camera,
  Clapperboard,
  ArrowRight,
  ExternalLink,
  Download,
  Phone,
  MapPin,
  Globe,
  User,
  Users
} from 'lucide-react';

// Mapeo estático centralizado (Arquitectura recomendada)
export const IconMap = {
  Youtube,
  Instagram,
  Mail,
  Link: LinkIcon,
  Smile,
  X,
  Menu,
  Play,
  Video: VideoIcon,
  Film,
  Camera,
  Clapperboard,
  ArrowRight,
  ExternalLink,
  Download,
  Phone,
  MapPin,
  Globe,
  User,
  Users
};

/**
 * Obtiene un componente de icono de forma segura
 * @param {string} name - Nombre del icono
 * @param {React.Component} fallback - Icono por defecto (Smile por defecto)
 */
export function getIcon(name, fallback = Smile) {
  return IconMap[name] || fallback;
}
