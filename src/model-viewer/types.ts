export interface Model {
  id: string;
  title: string;
  src: {
    gltf: string;
    usdz: string;
    image?: string;
  };
  school: {
    name: string;
    label: string;
  };
}
