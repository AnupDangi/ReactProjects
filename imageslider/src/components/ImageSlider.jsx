import { useState, useEffect } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsMenuButton,
} from "react-icons/bs";
import "./ImageSlider.css";

export default function ImageSlider({ url, limit, page }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url, page, limit]);
  console.log(images);

  if (loading) {
    return <div>Loading Data! Please Wait</div>;
  }

  if (errorMsg !== null) {
    return <div>Error Occured! {errorMsg}</div>;
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }
  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  return (
    <div className="container">
        <h3>Images to fill your heart with love❤️</h3>
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {images && images.length
        ? images.map((imagesItem,index) => (
            <img
              src={imagesItem.download_url}
              key={imagesItem.download_url}
              alt={imagesItem.url}
              className={
                currentSlide === index ? "current-image" : "update-current-image"
              }
            />
          ))
        : null}

      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "inactive-current-indicator"
                }
                onClick={()=>setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
