import Form from "react-bootstrap/Form";
import React, { useContext } from "react";
import WallpperCard from "./card";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import CardSkeleton from "./card_skelton";
import SearchBar from "./search";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { GetTopics, GetWallpaper, GetNextPage, GetPrevPage } from "./api_call";
import { WallPaperContext } from "./context/SeachContext";

function SelectBasicExample() {
  const [topics, setTopics] = React.useState([]);
  const [selectedtopic, setSelectedtopic] = React.useState("");
  const { wallpapers, updateSharedData, isLoading, updateLoading } =
    useContext(WallPaperContext);

  React.useEffect(() => {
    async function fetchTopicAsync() {
      try {
        const result = await GetTopics();
        setTopics(result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchTopicAsync();
  }, []);

  React.useEffect(() => {
    // Function to call the API with the selected value
    const fetchData = async () => {
      try {
        const result = await GetWallpaper(selectedtopic);
        updateLoading(false);
        updateSharedData(result);
        selectedtopic("");
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // Call the API only if a value is selected
    if (selectedtopic !== "") {
      fetchData();
    }
  }, [selectedtopic]);

  const handleSelectChange = (e) => {
    console.log("e===>", e.target.value);
    updateLoading(true);
    const value = e.target.value;
    setSelectedtopic(value);
  };

  const handleNextPage = (next_page_url) => {
    console.log("next_page_url", next_page_url);
    updateLoading(true);
    const fetchData = async () => {
      try {
        const result = await GetNextPage(next_page_url);
        updateLoading(false);
        updateSharedData(result);
        selectedtopic("");
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  };

  const handlePrevPage = (prev_page_url) => {
    console.log("prev_page_url", prev_page_url);
    updateLoading(true);
    const fetchData = async () => {
      try {
        const result = await GetPrevPage(prev_page_url);
        updateLoading(false);
        updateSharedData(result);
        selectedtopic("");
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">WallpaperWhimsy</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col lg={4}>
            <Form.Select
              aria-label="Select Topic"
              className="my-3"
              onChange={(e) => handleSelectChange(e)}
            >
              <option>Select Topics</option>
              {topics
                ? topics.map((topic, index) => (
                    <option value={topic} key={index}>
                      {topic}
                    </option>
                  ))
                : null}
            </Form.Select>
          </Col>
          <Col lg={8}>
            <SearchBar />
          </Col>
        </Row>

        {isLoading ? <CardSkeleton /> : <WallpperCard details={wallpapers} />}

        {wallpapers.page ? (
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="my-3"
          >
            <Pagination>
              <Pagination.Item key={wallpapers.page} active={true}>
                {wallpapers.page}
              </Pagination.Item>
            </Pagination>
          </div>
        ) : null}

        <div className="d-grid gap-2 my-3">
          {wallpapers.prev_page ? (
            <Button
              variant="dark"
              size="md"
              onClick={(e) => handlePrevPage(wallpapers.prev_page)}
            >
              <span>&#8592;</span>Previous Page
            </Button>
          ) : null}
          {wallpapers.next_page ? (
            <Button
              variant="dark"
              size="md"
              onClick={(e) => handleNextPage(wallpapers.next_page)}
            >
              Next Page <span>&#8594;</span>
            </Button>
          ) : null}
        </div>
      </Container>
    </>
  );
}

export default SelectBasicExample;
