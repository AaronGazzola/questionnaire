import { Button, Typography, Row, Col } from "antd";
import { useEffect } from "react";

const { Title, Paragraph } = Typography;

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh" }}
    >
      <Col>
        <Title
          type="danger"
          level={2}
        >
          Opps...
        </Title>
        <Paragraph>{error.message || "An error occurred"}</Paragraph>
        <Button
          type="primary"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </Col>
    </Row>
  );
}
