import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailPasswordResetLinkProps = {
  toName: string;
  url: string;
};

const EmailPasswordResetLink = ({
  toName,
  url,
}: EmailPasswordResetLinkProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                Hello {toName}, you have requested to reset your password. Click
                the button below to reset your password
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="bg-blue-500 text-white rounded p-2 m-2"
              >
                Reset Password
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailPasswordResetLink;
