export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  bio: string;
  status: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Links {
  github: string;
  linkedin: string;
  cvUrl: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  verified?: boolean;
  status?: string;
}

export interface Certifications {
  completed: Certification[];
  inProgress: Certification[];
  verificationBundleUrl: string;
}

export interface StyledCertification {
  name: string;
  type: string;
  badgeClass: string;
}

export interface ProfessionalReference {
  name: string;
  title: string;
  institution: string;
}

export interface PortfolioData {
  profile: Profile;
  metrics: Metric[];
  credentials: string[];
  links: Links;
  certifications?: Certifications;
  styledCertifications?: StyledCertification[];
  inProgressCertifications?: string[];
  professionalReferences?: ProfessionalReference[];
}
