export type ImageSourceType = {
  src: string;
  altText: string;
};

export type ModelViewerSourceType = {
  gltf: string;
  usdz: string;
  image: string;
};

export type SchoolType = {
  name: string;
  label: string;
};

export type Model3DType = {
  id: string;
  title: string;
  src: ModelViewerSourceType;
  school: SchoolType;
};
