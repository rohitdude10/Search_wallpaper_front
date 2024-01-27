import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Modal,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { SetWallpaper } from "./api_call";

function WallpaperCard({ details }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [downloadVersion, setDownloadVersion] = useState("original");
  const [hovered, setHovered] = useState(false);

  // const handleSetWallpaper = (id, url, name) => {
  //   const value = {
  //     id,
  //     url,
  //     name,
  //   };

  //   setWallpaper(value);
  // };

  // const setWallpaper = async (value) => {
  //   try {
  //     const result = await SetWallpaper(value);
  //     console.log(result);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleOpenModal = (details) => {
    setSelectedImage(details);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const downloadWallpaper = async () => {
    if (selectedImage.src && selectedImage.alt) {
      try {
        const response = await fetch(selectedImage.src[downloadVersion] ?? "");
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${selectedImage.alt}_${downloadVersion}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading wallpaper:", error);
      }
    }
  };
  const titleStyle = {
    fontFamily: "Caveat, cursive",
    fontWeight: "bold",
    fontSize: "1.3rem",
    color: "#333",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    background: "linear-gradient(to right, #FFD700, #FF8C00)",
    WebkitBackgroundClip: "text",
    // color: "transparent",
    display: "inline-block",
    // transition: "font-size 0.3s ease-in-out", // Add transition for smooth effect
  };
  const enlargedTitleStyle = {
    fontSize: hovered ? '1.3rem' : '1.3rem',
  };

  const getCardWidth = () => {
    // Define the card width based on screen size
    if (window.innerWidth >= 1200) {
      return '25rem'; // Desktop and ultra-wide screens
    } else if (window.innerWidth >= 768) {
      return '100%'; // Tablet screens
    } else {
      return '100%'; // Mobile screens
    }
  };

  return (
    <>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {details?.photos && details.photos.length > 0
          ? details.photos.map((details, index) => (
            <Col key={index} className="mb-4">
              <Card
                  style={{ width: getCardWidth(), height: "auto", cursor: "pointer" }}
                  bg="light"
                  onClick={() => handleOpenModal(details)}
                >
                  <Card.Img
                    // variant="top"
                    src={details.src.medium}
                    style={{ width: "auto", height: "auto" }}
                  />
                  <Card.ImgOverlay>
                    <Card.Title
                      style={{ ...titleStyle, ...enlargedTitleStyle }}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      {details.alt.slice(0, 20) + "..."}
                    </Card.Title>
                    {/* <Row>
                      <Button
                        variant="dark"
                        onClick={() =>
                          handleSetWallpaper(
                            details.id,
                            details.src.original,
                            details.alt
                          )
                        }
                      >
                        Set as Wallpaper
                      </Button>
                    </Row> */}
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))
          : null}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="l">
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage.alt}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage.src?.original}
            alt={selectedImage.alt}
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => downloadWallpaper(downloadVersion)}
          >
            Download
          </Button>
          <DropdownButton
            variant="info"
            title={`Download ${downloadVersion} Version`}
          >
            {selectedImage.src &&
              Object.keys(selectedImage.src).map((version) => (
                <Dropdown.Item
                  key={version}
                  onClick={() => setDownloadVersion(version)}
                >
                  {version.charAt(0).toUpperCase() + version.slice(1)}
                </Dropdown.Item>
              ))}
          </DropdownButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WallpaperCard;
