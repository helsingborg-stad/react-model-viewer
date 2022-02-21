/* eslint-disable react/no-unused-prop-types */
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ModelViewerElement } from "@app/components";
import ModelViewerScreen from "./ModelViewerScreen";

type ModelFilesType = {
  mediaItemUrl: string;
  mimeType: string;
};

type ModelType = {
  title: string;
  slug: string;
  modelFileFormats: {
    gltf: ModelFilesType;
    usdz: ModelFilesType;
  };
};

type SchoolType = {
  name: string;
  models: {
    nodes: ModelType[];
  };
};

const TEST_QUERY = gql`
  query MyQuery {
    schools {
      nodes {
        models {
          nodes {
            slug
            title
            modelFileFormats {
              gltf {
                mediaItemUrl
                mimeType
              }
              usdz {
                mediaItemUrl
                mediaType
              }
            }
          }
        }
        name
      }
    }
  }
`;

function DebugScreen() {
  const { loading, error, data } = useQuery(TEST_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { schools } = data;
  const { nodes } = schools;
  return (
    <div>
      <h2>DebugScreen</h2>
      {(nodes as SchoolType[]).map(({ name, models }) => (
        <span key={name}>
          <h3>{name}</h3>
          {models.nodes.map(
            ({ title, modelFileFormats: { gltf, usdz } }: ModelType) => (
              <div key={title}>
                <h4>{title}</h4>
                {/* <ModelViewerScreenWithMynt /> */}
                {/* <ModelViewerScreen
                    gltf="https://barnens-h22.multi.test/wp-content/uploads/sites/6/2022/02/barnens_h22.glb"
                    // usdz={USDZ_BARNENS_H22}
                  /> */}
                <ModelViewerScreen
                  gltf={gltf.mediaItemUrl}
                  usdz={usdz.mediaItemUrl}
                />
                {/* <ModelViewerElement
                    gltf={gltf.mediaItemUrl}
                    usdz={usdz.mediaItemUrl}
                  /> */}
              </div>
            )
          )}
        </span>
      ))}
    </div>
  );
}

export default DebugScreen;
