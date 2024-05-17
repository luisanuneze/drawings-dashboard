import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const itemData = [
  // {
  //   img: "/images/drawings/shot6.png",
  //   title: "Drawing",
  //   author: "@bkristastucchio",
  // },
  // {
  //   img: "/images/drawings/shot1.png",
  //   title: "Drawing",
  //   author: "@rollelflex_graphy726",
  // },
  // {
  //   img: "/images/drawings/shot3.png",
  //   title: "Drawing",
  //   author: "@helloimnik",
  // },
  // {
  //   img: "/images/drawings/shot4.png",
  //   title: "Drawing",
  //   author: "@nolanissac",
  // },
];

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div class="pb-8">
          <Link href="/create-drawing">
            <Button variant="contained"> Create Drawing</Button>
          </Link>
        </div>
        <ImageList>
          <div>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={item.img}
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar title={item.title} position="below" />
              </ImageListItem>
            ))}
          </div>
        </ImageList>
      </DefaultLayout>
    </>
  );
}
