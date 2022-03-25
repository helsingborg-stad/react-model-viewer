import { Alert, Box, Drawer, IconButton, LinearProgress } from "@mui/material";
import { useFullscreen } from "ahooks";
import React, { useContext, useRef, useState } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./sidebar/Sidebar";
import SelectedModelView from "./components/SelectedModelView";
import SelectedModelInfoView from "./components/SelectedModelInfoView";
import ModelRepositoryContext from "../ModelRepositoryContext";

export default function KioskView() {
  const { isLoading, isError } = useContext(ModelRepositoryContext);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);

  const [drawer, setDrawer] = useState(false);

  const drawerView = () => (
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
  );

  const contentView = () => (
    <>
      <Box sx={{ position: "absolute", top: "1em", left: "1em", zIndex: 1200 }}>
        <IconButton onClick={toggleFullscreen}>
          {isFullscreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
        </IconButton>
      </Box>
      {isLoading && <LinearProgress />}
      {isError && <Alert severity="error">Error</Alert>}
      <SelectedModelView />
    </>
  );

  const infoView = () => <SelectedModelInfoView />;

  return (
    <div ref={ref} style={{ background: "white" }}>
      {drawerView()}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxHeight: "100vh",
          backgroundColor: "lightGray",
        }}
      >
        <Box sx={{ flex: 1 }}>{contentView()}</Box>
        <Box
          sx={{
            backgroundColor: "gray",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              padding: "2rem",
            }}
          >
            <Box sx={{ flex: 1 }}>{infoView()}</Box>
            <Box>
              <IconButton onClick={() => setDrawer(true)}>
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
