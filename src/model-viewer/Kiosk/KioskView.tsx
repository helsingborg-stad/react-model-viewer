import { Alert, Box, Drawer, IconButton, LinearProgress } from "@mui/material";
import { useFullscreen } from "ahooks";
import React, { useContext, useRef, useState } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MenuIcon from "@mui/icons-material/Menu";
import SelectedModelView from "./components/SelectedModelView";
import SelectedModelInfoView from "./components/SelectedModelInfoView";
import ModelRepositoryContext from "../ModelRepositoryContext";
import ModelsNav from "./components/ModelsNavigationList";
import ModelsContext from "../ModelsContext";

export default function KioskView() {
  const { isLoading, isError } = useContext(ModelRepositoryContext);
  const { selectedModel } = useContext(ModelsContext);
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
        <ModelsNav />
      </Box>
    </Drawer>
  );

  const contentView = () => (
    <>
      <Box sx={{ position: "absolute", top: "1em", left: "1em", zIndex: 1200 }}>
        <IconButton onClick={toggleFullscreen}>
          {isFullscreen ? (
            <CloseFullscreenIcon fontSize="large" />
          ) : (
            <OpenInFullIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
      {isLoading && (
        <LinearProgress
          sx={{ marginTop: "auto", marginBottom: "auto" }}
          data-testid="kiosk-is-loading"
        />
      )}
      {isError && (
        <Alert
          severity="error"
          sx={{ marginTop: "4rem" }}
          data-testid="kiosk-has-error"
        >
          Error
        </Alert>
      )}
      <SelectedModelView />
    </>
  );

  const infoView = () => <SelectedModelInfoView />;

  return (
    <div
      ref={ref}
      style={{ background: "white" }}
      data-testid={`kioskview-for-model-${selectedModel?.id}`}
    >
      {drawerView()}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxHeight: "100vh",
          backgroundColor: "var(--content-gray-bg)",
        }}
      >
        <Box sx={{ flex: 1 }}>{contentView()}</Box>
        <Box
          sx={{
            backgroundColor: "var(--info-gray-bg)",
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
