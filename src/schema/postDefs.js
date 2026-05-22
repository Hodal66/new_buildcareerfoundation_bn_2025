// import { gql } from "apollo-server";
// export const postDefs = gql`
//   type Query {
//     getAllPosts: [PostReturned]!
//     getOnePost(id: ID!): PostReturned!
//   }
//   type Mutation {
//     addPost(input: PostInput): PostReturned!
//     updatePost(input: PostInputUpdate!): PostReturned!
//     deletePost(input: IdToUseWhileDeleting!): DeletedStatusObject!
//   }

//   type PostReturned {
//     title: String!
//     content: String!
//     contentSection1:String
//     contentSection2:String
//     contentSection3:String
//     # contentSection4:[SectionToBeReturned]
//     category: String!
//     image_url: [ImageToBeSavedReturned!]!
//     youtube_video_url: String!
//     _id: ID!
//     date_posted: String!
//   }

//   input PostInput {
//     title: String!
//     content: String!
//     contentSection1:String
//     contentSection2:String
//     contentSection3:String
//     # contentSection4:[SectionToBeSaved]
//     category: String!
//     image_url: [ImageToBeSaved!]!
//     youtube_video_url: String!
//     user_id: ID!
//   }

//   input PostInputUpdate {
//     title: String!
//     content: String!
//     contentSection1:String
//     contentSection2:String
//     contentSection3:String
//     # contentSection4:[SectionToBeSaved]
//     category: String!
//     image_url: [ImageToBeSaved!]
//     youtube_video_url: String!
//     post_id: ID!
//   }

//   input ImageToBeSaved {
//     url: String!
//     filename: String!
//   }
//   # input SectionToBeSaved {
//   #   title: String
//   #   descriptionContent: String
//   # }
//   # input SectionToBeReturned {
//   #   title: String
//   #   descriptionContent: String
//   # }
//   type ImageToBeSavedReturned {
//     url: String!
//     filename: String!
//   }
//   input IdToUseWhileDeleting {
//     post_id: ID!
//   }

//   type DeletedStatusObject {
//     isDeleted: Boolean!
//     message: String!
//   }
// `;

import { gql } from "apollo-server";

export const postDefs = gql`
  type Query {
    getAllPosts: [PostReturned]!
    getOnePost(id: ID!): PostReturned!
    getCloudinarySignature: CloudinarySignature!
  }

  type CloudinarySignature {
    signature: String!
    timestamp: Int!
    apiKey: String!
    cloudName: String!
    folder: String!
  }

  type Mutation {
    addPost(input: PostInput): PostReturned!
    updatePost(input: PostInputUpdate!): PostReturned!
    deletePost(input: ID!): DeletedStatusObject!
  }

  type PostReturned {
    title: String!
    content: String!
    contentSections: [ContentSectionReturned!]!
    category: String!
    image_url: ImageToBeSavedReturned!
    image_urls: [ImageToBeSavedReturned!]!
    youtube_video_url: String!
    _id: ID!
    date_posted: String!
  }

  input PostInput {
    title: String!
    content: String!
    contentSections: [ContentSectionInput!]!
    category: String!
    image_url: ImageToBeSaved!
    image_urls: [ImageToBeSaved!]!
    youtube_video_url: String!
    user_id: ID!
  }

  input PostInputUpdate {
    title: String!
    content: String!
    contentSections: [ContentSectionInput!]!
    category: String!
    image_url: ImageToBeSaved
    image_urls: [ImageToBeSaved!]
    youtube_video_url: String!
    post_id: ID!
  }

  input ContentSectionInput {
    sectionTitle: String!
    paragraph1: String!
    paragraph2: String!
  }

  type ContentSectionReturned {
    sectionTitle: String!
    paragraph1: String!
    paragraph2: String!
  }

  input ImageToBeSaved {
    url: String!
    filename: String!
  }

  type ImageToBeSavedReturned {
    url: String!
    filename: String!
  }

  type DeletedStatusObject {
    isDeleted: Boolean!
    message: String!
  }
`;
