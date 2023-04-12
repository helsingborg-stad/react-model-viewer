export interface Model {
  id: string;
  title: string;
  src: {
    gltf: string;
    usdz: string;
  };
  school: {
    name: string;
    label: string;
  };
  featuredImage: {
    src: string;
    srcSet: string;
  };
}
