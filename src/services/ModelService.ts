import { gql, ApolloQueryResult } from "@apollo/client";
import { Model3DType } from "@app/types";
import GQLClient from "./GQLClient";

type QueryModelsResponseType = {
  models: {
    nodes: {
      title: string;
      slug: string;
      databaseId: string;
      id: string;
      modelFileFormats: {
        gltf: {
          mediaItemUrl: string;
        };
        usdz: {
          mediaItemUrl: string;
        };
      };
      schools: {
        nodes: {
          databaseId: string;
          name: string;
          slug: string;
        }[];
      };
    }[];
  };
};

const deserializeQueryModelResponse = (
  data: QueryModelsResponseType
): Model3DType[] =>
  data.models.nodes.map(
    ({
      databaseId,
      title,
      modelFileFormats: { gltf, usdz },
      schools: {
        nodes: [school],
      },
    }) => ({
      id: databaseId,
      title,
      src: {
        gltf: gltf.mediaItemUrl,
        usdz: usdz.mediaItemUrl,
      },
      school: {
        id: school.databaseId,
        name: school.slug,
        label: school.name,
      },
    })
  );

export const queryModels = async () => {
  const { data } = await GQLClient.query<QueryModelsResponseType>({
    query: gql`
      query MyQuery {
        models(where: { status: PUBLISH }) {
          nodes {
            id
            databaseId
            title
            slug
            modelFileFormats {
              gltf {
                mediaItemUrl
              }
              usdz {
                mediaItemUrl
              }
            }
            schools {
              nodes {
                databaseId
                name
                slug
              }
            }
          }
        }
      }
    `,
  });

  return deserializeQueryModelResponse(data);
};

export default { queryModels };
