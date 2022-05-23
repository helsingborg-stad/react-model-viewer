import { gql, ApolloQueryResult } from "@apollo/client";
import { Model3DType } from "@app/types";
import GQLClient from "./GQLClient";
import appSettings from "../app-settings";

const { defaultImage } = appSettings;

type QueryModelsResponseType = {
  models: {
    pageInfo: {
      startCursor: string;
      endCursor: string;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
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
      featuredImage?: {
        node?: {
          sourceUrl?: string;
          srcSet?: string;
        };
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
      featuredImage,
    }) => ({
      id: databaseId,
      title,
      src: {
        gltf: gltf.mediaItemUrl,
        usdz: usdz.mediaItemUrl,
      },
      school: {
        id: school?.databaseId,
        name: school?.slug,
        label: school?.name,
      },
      featuredImage: {
        src: featuredImage?.node?.sourceUrl || defaultImage,
        srcSet: featuredImage?.node?.srcSet || "",
      },
    })
  );

interface PaginationParameters {
  first: number | null;
  last: number | null;
  after: string | null;
  before: string | null;
}
export const queryModelsPaginated = async (
  pagination?: Partial<PaginationParameters> | undefined
) => {
  const { data } = await GQLClient.query<QueryModelsResponseType>({
    variables: {
      first: pagination?.first || null,
      last: pagination?.last || null,
      before: pagination?.before || null,
      after: pagination?.after || null,
    },
    query: gql`
      query MyQuery($first: Int, $last: Int, $after: String, $before: String) {
        models(
          first: $first
          last: $last
          after: $after
          before: $before
          where: { status: PUBLISH }
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
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
            featuredImage {
              node {
                sourceUrl
                sizes(size: LARGE)
                srcSet
              }
            }
          }
        }
      }
    `,
  });
  return data; // deserializeQueryModelResponse(data);
};

export const queryModels = async () => {
  const collectPages = async (
    head: Model3DType[],
    after: string | null
  ): Promise<Model3DType[]> => {
    const response = await queryModelsPaginated({ after });
    const page = deserializeQueryModelResponse(response);
    const endCursor = response.models?.pageInfo?.endCursor;
    return endCursor
      ? collectPages([...head, ...page], endCursor)
      : [...head, ...page];
  };

  return collectPages([], null);
};

export default { queryModels };
