import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { useFullscreen } from "ahooks";
import React, { useContext, useRef, useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import MenuIcon from "@mui/icons-material/Menu";
import ModelView from "./ModelView";
import ModelRepositoryContext from "../ModelRepositoryContext";
import ModelsContext from "../ModelsContext";
import Sidebar from "./sidebar/Sidebar";

export default function KioskView() {
  const { isLoading, isError } = useContext(ModelRepositoryContext);
  const { selectedModel } = useContext(ModelsContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);

  const [drawer, setDrawer] = useState(false);

  const fullScreenControl = () => (
    <Card>
      <CardContent>
        <Grid container>
          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <IconButton onClick={() => setDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <div ref={ref} style={{ background: "white" }}>
      <Drawer
        open={drawer}
        anchor="right"
        onClose={() => setDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{ maxWidth: "75vh", width: "480px", height: "100%" }}>
          <Sidebar />
        </Box>
      </Drawer>

      <Container ref={ref} maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
        </Grid>
      </Container>
    </div>
  );
}
