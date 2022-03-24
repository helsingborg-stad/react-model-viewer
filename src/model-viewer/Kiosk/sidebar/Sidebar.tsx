import { Box, Stack, styled } from "@mui/material";
import React, { useContext } from "react";
import ModelsContext from "../../ModelsContext";
import Thumbnail from "./Thumbnail";

const ScrollingContentContainer = styled(Box)({
  position: "relative",
  height: "100%",
  width: "100%",
});
const ScrollingContent = styled(Box)({
  overflow: "scroll",
  height: "100%",
  width: "100%",
  position: "absolute",
  top: 0,
  right: 0,
});

export default function Sidebar() {
  const { models } = useContext(ModelsContext);
  return (
    <ScrollingContentContainer>
      <ScrollingContent>
        <Stack spacing={3}>
          {models.map((model) => (
            <Thumbnail key={model.id} model={model} />
          ))}
        </Stack>
      </ScrollingContent>
    </ScrollingContentContainer>
  );
}
