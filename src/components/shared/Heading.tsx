import { Separator } from "@/components/ui/separator";

type HeadingProps = {
  title: string;
  description: string;
  tabs?: React.ReactNode;
};

const Heading = ({ title, description, tabs }: HeadingProps) => {
  return (
    <>
      {tabs}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Separator />
    </>
  );
};

export default Heading;
