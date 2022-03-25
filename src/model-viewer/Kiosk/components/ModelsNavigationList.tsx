import React, { useContext } from "react";
import { Box, Stack, styled } from "@mui/material";
import ModelsContext from "../../ModelsContext";
import ModelsNavModel from "./ModelsNavigationModel";

const ScrollingContentContainer = styled(Box)({
  position: "relative",
  height: "100%",
  width: "100%",
  backgroundColor: "var(--nav-bg-yellow)",
});

const ScrollingContent = styled(Box)({
  overflow: "scroll",
  height: "100%",
  width: "100%",
  position: "absolute",
  top: 0,
  right: 0,
});

export default function ModelsNavigationList() {
  const { models, selectedModel, setSelectedModel } = useContext(ModelsContext);
  return (
    <ScrollingContentContainer>
      <ScrollingContent>
        <Stack spacing={3}>
          {models.map((model) => (
            <ModelsNavModel
              key={model.id}
              model={model}
              isSelected={model === selectedModel}
              onSelect={setSelectedModel}
            />
          ))}
        </Stack>
      </ScrollingContent>
    </ScrollingContentContainer>
  );
}
