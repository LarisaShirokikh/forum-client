import React, { useState, useEffect, useRef } from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { PostProps, Post as PostInterface } from "@/interface/Post";
import { updateViews } from "../db/apiPost";

const Post = ({ post, currentUser }: PostProps) => {
  const [views, setViews] = useState(post.views);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const postRef = useRef<HTMLDivElement | null>(null);
  const hasBeenViewed = useRef(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const updateViewsPosts = async () => {
      try {
        await updateViews(post.id);
        setViews((prevViews) => prevViews + 1);
      } catch (error) {
        console.error("Failed to update views", error);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed.current) {
          updateViewsPosts();
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

  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = null;
    if (galleryRef.current) {
      lightbox = new PhotoSwipeLightbox({
        gallery: galleryRef.current,
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    }

    return () => {
      if (lightbox) {
        lightbox.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      if (scrollHeight > clientHeight) {
        setShouldShowMore(true);
      }
    }
  }, []);

  const loadImageSize = (
    url: string
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
    });
  };

  const preparePhotos = async () => {
    const photosWithSize = await Promise.all(
      post.photos?.map(async (photo) => {
        const url = `http://localhost:4000${photo.url}`;
        const { width, height } = await loadImageSize(url);
        return {
          ...photo,
          url,
          width: 800,
          height: Math.floor((800 * height) / width),
        };
      }) || []
    );
    return photosWithSize;
  };

  const [photos, setPhotos] = useState<
    { url: string; width: number; height: number }[]
  >([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photosWithSize = await preparePhotos();
      setPhotos(photosWithSize);
    };
    fetchPhotos();
  }, [post.photos]);

  return (
    <div className="p-3 bg-white rounded-xl border" ref={postRef}>
      <PostHeader
        user={post.user}
        createdAt={post.createdAt}
        currentUser={currentUser}
      />
      <h2 className="text-xl text-gray-700 font-bold mb-2">{post.title}</h2>
      <div className="relative">
        <p
          className={`text-gray-700 mb-4 ${isExpanded ? "" : "line-clamp-3"}`}
          ref={textRef}
        >
          {post.desc}
        </p>
        {shouldShowMore && (
          <button
            className={`absolute bottom-0 right-0 bg-white ${
              isExpanded ? "hidden" : ""
            } text-gray-300 hover:text-gray-400`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            ... читать полностью
          </button>
        )}
      </div>
      {isExpanded && (
        <button
          className="text-gray-300 hover:text-gray-400 mb-3"
          onClick={() => setIsExpanded(false)}
        >
          Свернуть
        </button>
      )}

      <div className="pswp-gallery" ref={galleryRef}>
        {photos.length > 0 && (
          <div className="mb-4">
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {photos.map((photo, index) => (
                <a
                  href={photo.url}
                  data-pswp-width={photo.width}
                  data-pswp-height={photo.height}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={photo.url}
                    alt="photo"
                    className="w-full h-auto object-cover rounded-xl flex-shrink-0 cursor-pointer"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {post.videos && post.videos.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {post.videos.map((video) => (
                <a
                  href={`http://localhost:4000${video.url}`}
                  data-pswp-type="video"
                  key={video.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <video
                    className="w-full h-auto object-cover rounded-xl cursor-pointer"
                    controls
                  >
                    <source
                      src={`http://localhost:4000${video.url}`}
                      type="video/mp4"
                    />
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                </a>
              ))}
            </div>
          </div>
        )}

        {post.files && post.files.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {post.files.map((file) => (
                <a
                  key={file.id}
                  href={`http://localhost:4000${file.url}`}
                  download
                  className="text-blue-500 underline"
                >
                  {file.filename || file.url.split("/").pop()}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <PostFooter
        likes={post.likes}
        usersComments={post.usersComments} // Убедитесь, что это массив комментариев
        views={views}
        postId={post.id.toString()} 
        commentsCount={0}      />
    </div>
  );
};

export default Post;
