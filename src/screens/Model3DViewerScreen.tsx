/* eslint-disable no-shadow */
import { queryModels } from "@app/services/ModelService";
import { Model3DType } from "@app/types";

import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { AspectRatio } from "react-aspect-ratio";
import { ModelViewerElement } from "@app/components";

import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useFullscreen } from "ahooks";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

function Model3DViewerScreen() {
  const { isLoading, isError, data, error } = useQuery("models", queryModels);
  const [currentModelId, setCurrentModelId] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(ref);

  useEffect(() => {
    if (data && !currentModelId) {
      setCurrentModelId(data[0].id);
    }
  }, [data, currentModelId]);

  if (isLoading) return <div>Loading</div>;

  if (isError || !data || !currentModelId) return <div>Error</div>;

  const {
    title,
    src: { gltf, usdz },
    school: { label },
  } = data.filter((model) => model.id === currentModelId)[0];

  return (
    <div ref={ref} style={{ background: "white" }}>
      <Container ref={ref} maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    {isFullscreen ? (
                      <IconButton onClick={exitFullscreen}>
                        <CloseFullscreenIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={enterFullscreen}>
                        <OpenInFullIcon />
                      </IconButton>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography variant="h4" component="h1">
                          {title}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          color="text.secondary"
                        >
                          {label}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <AspectRatio ratio="1/1">
                          <ModelViewerElement {...{ gltf, usdz }} />
                        </AspectRatio>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <div
                style={{
                  overflow: "scroll",
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <Stack spacing={3}>
                  {data.map(({ id, title, school, src: { gltf, usdz } }) => (
                    <Card key={id}>
                      <CardActionArea
                        sx={{
                          bgcolor: currentModelId === id ? "primary.main" : "",
                        }}
                        onClick={() => {
                          setCurrentModelId(id);
                        }}
                      >
                        <AspectRatio ratio="16/9">
                          <model-viewer
                            src={gltf}
                            ios-src={usdz}
                            background-color="#2EAFAC"
                          />
                        </AspectRatio>
                        <CardContent>
                          <Typography variant="h6" component="h3">
                            {title}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                          >
                            {school.label}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </Stack>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Model3DViewerScreen;
