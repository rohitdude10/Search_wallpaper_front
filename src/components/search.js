import React, { useContext, useState } from "react";
import { Form, FormControl, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../constant";
import { WallPaperContext } from "./context/SeachContext";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { updateSharedData, updateLoading } = useContext(WallPaperContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    updateLoading(true);

    try {
      const response = await axios.get(`${API_URL}wallpapers/${searchText}`);
      const { theme } = response.data;

      updateSharedData(theme);
    } catch (error) {
      // Handle errors if needed
    } finally {
      updateLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(e);
    }
  };

  return (
    <Row>
      <Col lg={9}>
        <Form>
          <FormControl
            type="text"
            placeholder="Search"
            className="my-3"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Form>
      </Col>
      <Col lg={3}>
        <Button
          variant="dark"
          className="my-3"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Col>
    </Row>
  );
};

export default SearchBar;
