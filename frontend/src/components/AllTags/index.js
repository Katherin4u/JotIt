import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTagsThunk } from "../../store/tags";

const AllTags = () => {
  const dispatch = useDispatch();
  const storeTag = useSelector((state) => state.tags.allTags);
  const tags = Object.values(storeTag || {});

  useEffect(() => {
    dispatch(allTagsThunk());
  }, [dispatch]);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginLeft: "20rem" }}>
      <div>
        {tags.map((tag) => (
          <div key={tag.id}>
            <div>{tag.name}</div>
            <div>{tag.color}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTags;