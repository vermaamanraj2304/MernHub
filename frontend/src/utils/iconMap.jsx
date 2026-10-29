import React from 'react';
import {
  Rocket,
  FileCode,
  Server,
  Network,
  Database,
  Atom,
  Workflow,
  ShieldCheck,
  Sparkles,
  CloudUpload,
  FolderKanban,
  Briefcase,
  BookOpen,
  Code2,
  HelpCircle,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

const icons = {
  Rocket,
  FileCode,
  Server,
  Network,
  Database,
  Atom,
  Workflow,
  ShieldCheck,
  Sparkles,
  CloudUpload,
  FolderKanban,
  Briefcase,
  BookOpen,
  Code2,
  HelpCircle,
  CheckCircle2,
  Clock,
  Layers,
};

export function ModuleIcon({ name, className = 'w-5 h-5' }) {
  const IconComponent = icons[name] || BookOpen;
  return <IconComponent className={className} />;
}
