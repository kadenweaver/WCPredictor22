import { createIcon } from "@chakra-ui/react";

export const England =  createIcon({
    displayName: "England",
    viewBox: "0 0 640 480",
    path: (
      [
        <path
          fill="white"
          d="M0 0h640v480H0z"
        />,
        <path
          fill="red"
          d="M281.6 0h76.8v480h-76.8z"
        />,
        <path
          fill="red"
          d="M0 201.6h640v76.8H0z"
        />
      ]
    ),
  });