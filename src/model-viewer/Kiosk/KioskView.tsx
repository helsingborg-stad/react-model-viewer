import {
  Alert,
  Box,
  Drawer,
  IconButton,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFullscreen } from "ahooks";
import React, { useContext, useRef, useState } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SelectedModelView from "./components/SelectedModelView";
import SelectedModelInfoView from "./components/SelectedModelInfoView";
import ModelRepositoryContext from "../ModelRepositoryContext";
import ModelsNav from "./components/ModelsNavigationList";
import ModelsContext from "../ModelsContext";
import ModelsSliderButtons from "./components/ModelsSliderButtons";

export default function KioskView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });
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
      variant="persistent"
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
      {" "}
      {!isMobile && (
        <Box
          sx={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 1200 }}
        >
          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? (
              <CloseFullscreenIcon fontSize="large" />
            ) : (
              <OpenInFullIcon fontSize="large" />
            )}
          </IconButton>
        </Box>
      )}
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
      <ModelsSliderButtons />
    </>
  );

  const infoView = () => <SelectedModelInfoView isMobile={isMobile} />;

  return (
    <div
      ref={ref}
      style={{ background: "#bec4c9" }}
      data-testid={`kioskview-for-model-${selectedModel?.id}`}
    >
      {drawerView()}

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "column",
          height: "100vh",
          maxHeight: "100vh",
          backgroundColor: "var(--content-gray-bg)",
          width: drawer ? "calc(100% - 25vh)" : "100%",
          transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          willChange: "contents",
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
              <IconButton onClick={() => setDrawer(!drawer)}>
                {drawer ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <MenuIcon fontSize="large" />
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
