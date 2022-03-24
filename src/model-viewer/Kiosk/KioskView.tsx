import {
  Alert,
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Drawer,
  Grid,
  IconButton,
} from "@mui/material";
import { useFullscreen } from "ahooks";
import React, { useRef, useState } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./sidebar/Sidebar";
import SelectedModelView from "./SelectedModelView";
import SelectedModelInfoView from "./SelectedModelInfoView";

export default function KioskView() {
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
        <Box
          sx={{
            maxWidth: "75vh",
            minWidth: "25vh",
            height: "100%",
          }}
        >
          <Sidebar />
        </Box>
      </Drawer>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxHeight: "100vh",
          backgroundColor: "lightGray",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{ position: "absolute", top: "1em", left: "1em", zIndex: 1200 }}
          >
            <IconButton onClick={toggleFullscreen}>
              {isFullscreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
            </IconButton>
          </Box>
          <SelectedModelView />
        </Box>
        <Box
          sx={{
            backgroundColor: "gray",
            marginTop: "auto",
            marginBottom: "auto",
            minHeight: "8rem",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ flex: 1 }}>
              <SelectedModelInfoView />
            </Box>
            <Box>
              <IconButton onClick={() => setDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
