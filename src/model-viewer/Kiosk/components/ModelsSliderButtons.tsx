import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import ModelsContext from "@app/model-viewer/ModelsContext";

export default function ModelsSliderButtons() {
  const { models, setSelectModelFromDeltaIndex } = useContext(ModelsContext);
  if (models.length === 0) {
    return null;
  }
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
        }}
      >
        <Button onClick={() => setSelectModelFromDeltaIndex(-1)}>
          <ChevronLeft fontSize="large" />
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
        }}
      >
        <Button onClick={() => setSelectModelFromDeltaIndex(1)}>
          <ChevronRight fontSize="large" />
        </Button>
      </Box>
    </>
  );
}
