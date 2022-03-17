import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  styled,
} from "@mui/material";
import { useFullscreen } from "ahooks";
import React, { useContext, useRef } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import ModelView from "./ModelView";
import Thumbnail from "./Thumbnail";
import ModelRepositoryContext from "../ModelRepositoryContext";
import ModelsContext from "../ModelsContext";

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

export default function KioskView() {
  const { isLoading, isError, error, models } = useContext(
    ModelRepositoryContext
  );
  const { selectedModel } = useContext(ModelsContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);

  const scollingListOfModels = () => (
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

  const fullScreenControl = () => (
    <Card>
      <CardContent>
        <IconButton onClick={toggleFullscreen}>
          {isFullscreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );

  return (
    <div ref={ref} style={{ background: "white" }}>
      <Container ref={ref} maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {fullScreenControl()}
              </Grid>

              <Grid item xs={12}>
                {isLoading && <LinearProgress />}
                {isError && <Alert severity="error">Error</Alert>}
                {selectedModel && <ModelView model={selectedModel} />}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            {scollingListOfModels()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
