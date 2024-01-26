import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CardSkeleton(props) {
  return (
    <>
      <Row>
        <Col>
          <Skeleton count={1} width={"95%"} height={250} />
          <Skeleton count={1} width={"95%"} height={50} />
          <Skeleton count={1} width={"95%"} height={250} className="mt-3"/>
          <Skeleton count={1} width={"95%"} height={50} />
        </Col>
        <Col>
          <Skeleton count={1} width={"95%"} height={250} />
          <Skeleton count={1} width={"95%"} height={50} />
          <Skeleton count={1} width={"95%"} height={250} className="mt-3" />
          <Skeleton count={1} width={"95%"} height={50} />
        </Col>
        <Col>
          <Skeleton count={1} width={"95%"} height={250} />
          <Skeleton count={1} width={"95%"} height={50} />
          <Skeleton count={1} width={"95%"} height={250} className="mt-3"/>
          <Skeleton count={1} width={"95%"} height={50} />
        </Col>
        <Col>
          <Skeleton count={1} width={"95%"} height={250} />
          <Skeleton count={1} width={"95%"} height={50} />
          <Skeleton count={1} width={"95%"} height={250} className="mt-3"/>
          <Skeleton count={1} width={"95%"} height={50} />
        </Col>
      </Row>
    </>
  );
}

export default CardSkeleton;
