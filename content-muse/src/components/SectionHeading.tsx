interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
  </div>
);

export default SectionHeading;
