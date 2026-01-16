import { Separator } from "@/components/ui/separator";

type HeadingProps = {
  title: string;
  description: string;
  tabs?: React.ReactNode;
  action?: React.ReactNode;
};

const Heading = ({ title, description, tabs, action }: HeadingProps) => {
  return (
    <>
      {tabs}
      <div className="flex items-center justify-between px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div>{action}</div>
      </div>
      <Separator />
    </>
  );
};

export default Heading;
