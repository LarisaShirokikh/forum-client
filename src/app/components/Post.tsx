import React, { useState, useEffect, useRef } from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import axios from "axios";

const Post = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  const [mediaUrls, setMediaUrls] = useState([]);
   const [views, setViews] = useState(post.views);
   const postRef = useRef(null);
   const hasBeenViewed = useRef(false);

   useEffect(() => {
     const updateViews = async () => {
       try {
         await axios.post(`/api/posts/${post.id}/views`);
         setViews((prevViews) => prevViews + 1);
       } catch (error) {
         console.error("Failed to update views", error);
       }
     };

     const observer = new IntersectionObserver(
       ([entry]) => {
         if (entry.isIntersecting && !hasBeenViewed.current) {
           updateViews();
           hasBeenViewed.current = true;
         }
       },
       {
         threshold: 0.25, // Четверть поста должна быть видна, чтобы считать его просмотренным
       }
     );

     if (postRef.current) {
       observer.observe(postRef.current);
     }

     return () => {
       if (postRef.current) {
         observer.unobserve(postRef.current);
       }
     };
   }, [post.id]);

  const openLightbox = (index, isVideo = false) => {
    setCurrentIndex(index);
    setIsVideo(isVideo);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setIsVideo(false);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % mediaUrls.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex + mediaUrls.length - 1) % mediaUrls.length);
  };

  useEffect(() => {
    const urls = [];
    post.photos &&
      post.photos.forEach((photo) =>
        urls.push(`http://localhost:4000${photo.url}`)
      );
    post.videos &&
      post.videos.forEach((video) =>
        urls.push(`http://localhost:4000${video.url}`)
      );
    setMediaUrls(urls);

    // Предзагрузка изображений
    post.photos &&
      post.photos.forEach((photo) => {
        const img = new Image();
        img.src = `http://localhost:4000${photo.url}`;
      });
  }, [post.photos, post.videos]);

  return (
    <div className="p-6 bg-white rounded-xl border">
      <PostHeader user={post.user} createdAt={post.createdAt} />
      <h2 className="text-xl text-gray-700 font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.desc}</p>

      {post.photos && post.photos.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Photos:</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {post.photos.map((photo, index) => (
              <img
                key={photo.id}
                src={`http://localhost:4000${photo.url}`}
                alt="photo"
                className="w-56  object-cover rounded-xl flex-shrink-0 cursor-pointer"
                srcSet={`http://localhost:4000${photo.url} 1x, http://localhost:4000${photo.url} 2x`}
                loading="lazy"
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      )}

      {post.videos && post.videos.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Videos:</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {post.videos.map((video, index) => (
              <video
                key={video.id}
                className="w-56  object-cover rounded-xl flex-shrink-0 cursor-pointer"
                onClick={() =>
                  openLightbox(
                    index + (post.photos ? post.photos.length : 0),
                    true
                  )
                }
              >
                <source
                  src={`http://localhost:4000${video.url}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        </div>
      )}

      {post.files && post.files.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Files:</h3>
          <div className="flex flex-wrap gap-2">
            {post.files.map((file) => (
              <a
                key={file.id}
                href={`http://localhost:4000${file.url}`}
                download
                className="text-blue-500 underline"
              >
                {file.filename}
              </a>
            ))}
          </div>
        </div>
      )}
      <PostFooter
        likes={post.likes}
        comments={post.comments}
        views={post.views}
      />

      {isOpen && (
        <Lightbox
          mainSrc={isVideo ? undefined : mediaUrls[currentIndex]}
          onCloseRequest={closeLightbox}
          nextSrc={mediaUrls[(currentIndex + 1) % mediaUrls.length]}
          prevSrc={
            mediaUrls[(currentIndex + mediaUrls.length - 1) % mediaUrls.length]
          }
          onMovePrevRequest={goToPrevious}
          onMoveNextRequest={goToNext}
          reactModalStyle={{
            overlay: {
              zIndex: 1040,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          }}
        >
          {isVideo && (
            <video controls className="w-full h-full object-contain">
              <source src={mediaUrls[currentIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Lightbox>
      )}
    </div>
  );
};

export default Post;
