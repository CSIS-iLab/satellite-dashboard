/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPostAuthor = /* GraphQL */ `
  mutation CreatePostAuthor(
    $input: CreatePostAuthorInput!
    $condition: ModelPostAuthorConditionInput
  ) {
    createPostAuthor(input: $input, condition: $condition) {
      id
      postID
      authorID
      post {
        id
        slug
        title
        postDate
        updatedAt
        excerpt
        featureImage {
          key
          identityId
          level
        }
        featureImageCaption
        eventTypeIDs
        tagIDs
        relatedSatelliteIDs
        relatedPostIDs
        furtherReadings {
          name
          author
          url
        }
        content
        authors {
          items {
            id
            postID
            authorID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              eventTypeIDs
              tagIDs
              relatedSatelliteIDs
              relatedPostIDs
              content
            }
            author {
              id
              name
              biography
            }
          }
          nextToken
        }
      }
      author {
        id
        name
        biography
        posts {
          items {
            id
            postID
            authorID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              eventTypeIDs
              tagIDs
              relatedSatelliteIDs
              relatedPostIDs
              content
            }
            author {
              id
              name
              biography
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const updatePostAuthor = /* GraphQL */ `
  mutation UpdatePostAuthor(
    $input: UpdatePostAuthorInput!
    $condition: ModelPostAuthorConditionInput
  ) {
    updatePostAuthor(input: $input, condition: $condition) {
      id
      postID
      authorID
      post {
        id
        slug
        title
        postDate
        updatedAt
        excerpt
        featureImage {
          key
          identityId
          level
        }
        featureImageCaption
        eventTypeIDs
        tagIDs
        relatedSatelliteIDs
        relatedPostIDs
        furtherReadings {
          name
          author
          url
        }
        content
        authors {
          items {
            id
            postID
            authorID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              eventTypeIDs
              tagIDs
              relatedSatelliteIDs
              relatedPostIDs
              content
            }
            author {
              id
              name
              biography
            }
          }
          nextToken
        }
      }
      author {
        id
        name
        biography
        posts {
          items {
            id
            postID
            authorID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              eventTypeIDs
              tagIDs
              relatedSatelliteIDs
              relatedPostIDs
              content
            }
            author {
              id
              name
              biography
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const deletePostAuthor = /* GraphQL */ `
  mutation DeletePostAuthor(
    $input: DeletePostAuthorInput!
    $condition: ModelPostAuthorConditionInput
  ) {
    deletePostAuthor(input: $input, condition: $condition) {
      id
      postID
      authorID
      post {
        id
        slug
        title
        postDate
        updatedAt
        excerpt
        featureImage {
          key
          identityId
          level
        }
        featureImageCaption
        eventTypeIDs
        tagIDs
        relatedSatelliteIDs
        relatedPostIDs
        furtherReadings {
          name
          author
          url
        }
        content
        authors {
          items {
            id
            postID
            authorID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              eventTypeIDs
              tagIDs
              relatedSatelliteIDs
              relatedPostIDs
              content
            }
            author {
              id
              name
              biography
            }
          }
          nextToken
        }
      }
      author {
        id
        name
        biography
        posts {
          items {
            id
            postID
            authorID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              eventTypeIDs
              tagIDs
              relatedSatelliteIDs
              relatedPostIDs
              content
            }
            author {
              id
              name
              biography
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      slug
      title
      postDate
      updatedAt
      excerpt
      featureImage {
        key
        identityId
        level
      }
      featureImageCaption
      eventTypeIDs
      tagIDs
      relatedSatelliteIDs
      relatedPostIDs
      furtherReadings {
        name
        author
        url
      }
      content
      authors {
        items {
          id
          postID
          authorID
          post {
            id
            slug
            title
            postDate
            updatedAt
            excerpt
            featureImage {
              key
              identityId
              level
            }
            featureImageCaption
            eventTypeIDs
            tagIDs
            relatedSatelliteIDs
            relatedPostIDs
            furtherReadings {
              name
              author
              url
            }
            content
            authors {
              nextToken
            }
          }
          author {
            id
            name
            biography
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      slug
      title
      postDate
      updatedAt
      excerpt
      featureImage {
        key
        identityId
        level
      }
      featureImageCaption
      eventTypeIDs
      tagIDs
      relatedSatelliteIDs
      relatedPostIDs
      furtherReadings {
        name
        author
        url
      }
      content
      authors {
        items {
          id
          postID
          authorID
          post {
            id
            slug
            title
            postDate
            updatedAt
            excerpt
            featureImage {
              key
              identityId
              level
            }
            featureImageCaption
            eventTypeIDs
            tagIDs
            relatedSatelliteIDs
            relatedPostIDs
            furtherReadings {
              name
              author
              url
            }
            content
            authors {
              nextToken
            }
          }
          author {
            id
            name
            biography
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      slug
      title
      postDate
      updatedAt
      excerpt
      featureImage {
        key
        identityId
        level
      }
      featureImageCaption
      eventTypeIDs
      tagIDs
      relatedSatelliteIDs
      relatedPostIDs
      furtherReadings {
        name
        author
        url
      }
      content
      authors {
        items {
          id
          postID
          authorID
          post {
            id
            slug
            title
            postDate
            updatedAt
            excerpt
            featureImage {
              key
              identityId
              level
            }
            featureImageCaption
            eventTypeIDs
            tagIDs
            relatedSatelliteIDs
            relatedPostIDs
            furtherReadings {
              name
              author
              url
            }
            content
            authors {
              nextToken
            }
          }
          author {
            id
            name
            biography
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const createAuthor = /* GraphQL */ `
  mutation CreateAuthor(
    $input: CreateAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    createAuthor(input: $input, condition: $condition) {
      id
      name
      biography
      posts {
        items {
          id
          postID
          authorID
          post {
            id
            slug
            title
            postDate
            updatedAt
            excerpt
            featureImage {
              key
              identityId
              level
            }
            featureImageCaption
            eventTypeIDs
            tagIDs
            relatedSatelliteIDs
            relatedPostIDs
            furtherReadings {
              name
              author
              url
            }
            content
            authors {
              nextToken
            }
          }
          author {
            id
            name
            biography
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const updateAuthor = /* GraphQL */ `
  mutation UpdateAuthor(
    $input: UpdateAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    updateAuthor(input: $input, condition: $condition) {
      id
      name
      biography
      posts {
        items {
          id
          postID
          authorID
          post {
            id
            slug
            title
            postDate
            updatedAt
            excerpt
            featureImage {
              key
              identityId
              level
            }
            featureImageCaption
            eventTypeIDs
            tagIDs
            relatedSatelliteIDs
            relatedPostIDs
            furtherReadings {
              name
              author
              url
            }
            content
            authors {
              nextToken
            }
          }
          author {
            id
            name
            biography
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const deleteAuthor = /* GraphQL */ `
  mutation DeleteAuthor(
    $input: DeleteAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    deleteAuthor(input: $input, condition: $condition) {
      id
      name
      biography
      posts {
        items {
          id
          postID
          authorID
          post {
            id
            slug
            title
            postDate
            updatedAt
            excerpt
            featureImage {
              key
              identityId
              level
            }
            featureImageCaption
            eventTypeIDs
            tagIDs
            relatedSatelliteIDs
            relatedPostIDs
            furtherReadings {
              name
              author
              url
            }
            content
            authors {
              nextToken
            }
          }
          author {
            id
            name
            biography
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
export const createOrbitalData = /* GraphQL */ `
  mutation CreateOrbitalData(
    $input: CreateOrbitalDataInput!
    $condition: ModelOrbitalDataConditionInput
  ) {
    createOrbitalData(input: $input, condition: $condition) {
      apogee {
        datasource {
          id
          name
        }
        value
      }
      argumentOfPerigee {
        datasource {
          id
          name
        }
        value
      }
      perigree {
        datasource {
          id
          name
        }
        value
      }
      eccentricity {
        datasource {
          id
          name
        }
        value
      }
      inclination {
        datasource {
          id
          name
        }
        value
      }
      longitude {
        datasource {
          id
          name
        }
        value
      }
      meanMotion {
        datasource {
          id
          name
        }
        value
      }
      orbitalPeriod {
        datasource {
          id
          name
        }
        value
      }
      semiMajorAxis {
        datasource {
          id
          name
        }
        value
      }
      driftRate {
        datasource {
          id
          name
        }
        value
      }
    }
  }
`;
export const updateOrbitalData = /* GraphQL */ `
  mutation UpdateOrbitalData(
    $input: UpdateOrbitalDataInput!
    $condition: ModelOrbitalDataConditionInput
  ) {
    updateOrbitalData(input: $input, condition: $condition) {
      apogee {
        datasource {
          id
          name
        }
        value
      }
      argumentOfPerigee {
        datasource {
          id
          name
        }
        value
      }
      perigree {
        datasource {
          id
          name
        }
        value
      }
      eccentricity {
        datasource {
          id
          name
        }
        value
      }
      inclination {
        datasource {
          id
          name
        }
        value
      }
      longitude {
        datasource {
          id
          name
        }
        value
      }
      meanMotion {
        datasource {
          id
          name
        }
        value
      }
      orbitalPeriod {
        datasource {
          id
          name
        }
        value
      }
      semiMajorAxis {
        datasource {
          id
          name
        }
        value
      }
      driftRate {
        datasource {
          id
          name
        }
        value
      }
    }
  }
`;
export const deleteOrbitalData = /* GraphQL */ `
  mutation DeleteOrbitalData(
    $input: DeleteOrbitalDataInput!
    $condition: ModelOrbitalDataConditionInput
  ) {
    deleteOrbitalData(input: $input, condition: $condition) {
      apogee {
        datasource {
          id
          name
        }
        value
      }
      argumentOfPerigee {
        datasource {
          id
          name
        }
        value
      }
      perigree {
        datasource {
          id
          name
        }
        value
      }
      eccentricity {
        datasource {
          id
          name
        }
        value
      }
      inclination {
        datasource {
          id
          name
        }
        value
      }
      longitude {
        datasource {
          id
          name
        }
        value
      }
      meanMotion {
        datasource {
          id
          name
        }
        value
      }
      orbitalPeriod {
        datasource {
          id
          name
        }
        value
      }
      semiMajorAxis {
        datasource {
          id
          name
        }
        value
      }
      driftRate {
        datasource {
          id
          name
        }
        value
      }
    }
  }
`;
export const createSatellite = /* GraphQL */ `
  mutation CreateSatellite(
    $input: CreateSatelliteInput!
    $condition: ModelSatelliteConditionInput
  ) {
    createSatellite(input: $input, condition: $condition) {
      id
      name {
        value
        override
      }
      launchDate
      launchVehicle
      launchSite
      countryOfLaunchSite {
        value
        override
      }
      countryOfJurisdiction
      contractor
      operator
      purpose {
        value
        override
      }
      satelliteType {
        value
        override
      }
      lifetime
      status {
        value
        override
      }
      orbitalDatum {
        apogee {
          datasource {
            id
            name
          }
          value
        }
        argumentOfPerigee {
          datasource {
            id
            name
          }
          value
        }
        perigree {
          datasource {
            id
            name
          }
          value
        }
        eccentricity {
          datasource {
            id
            name
          }
          value
        }
        inclination {
          datasource {
            id
            name
          }
          value
        }
        longitude {
          datasource {
            id
            name
          }
          value
        }
        meanMotion {
          datasource {
            id
            name
          }
          value
        }
        orbitalPeriod {
          datasource {
            id
            name
          }
          value
        }
        semiMajorAxis {
          datasource {
            id
            name
          }
          value
        }
        driftRate {
          datasource {
            id
            name
          }
          value
        }
      }
      relatedPostIDs
    }
  }
`;
export const updateSatellite = /* GraphQL */ `
  mutation UpdateSatellite(
    $input: UpdateSatelliteInput!
    $condition: ModelSatelliteConditionInput
  ) {
    updateSatellite(input: $input, condition: $condition) {
      id
      name {
        value
        override
      }
      launchDate
      launchVehicle
      launchSite
      countryOfLaunchSite {
        value
        override
      }
      countryOfJurisdiction
      contractor
      operator
      purpose {
        value
        override
      }
      satelliteType {
        value
        override
      }
      lifetime
      status {
        value
        override
      }
      orbitalDatum {
        apogee {
          datasource {
            id
            name
          }
          value
        }
        argumentOfPerigee {
          datasource {
            id
            name
          }
          value
        }
        perigree {
          datasource {
            id
            name
          }
          value
        }
        eccentricity {
          datasource {
            id
            name
          }
          value
        }
        inclination {
          datasource {
            id
            name
          }
          value
        }
        longitude {
          datasource {
            id
            name
          }
          value
        }
        meanMotion {
          datasource {
            id
            name
          }
          value
        }
        orbitalPeriod {
          datasource {
            id
            name
          }
          value
        }
        semiMajorAxis {
          datasource {
            id
            name
          }
          value
        }
        driftRate {
          datasource {
            id
            name
          }
          value
        }
      }
      relatedPostIDs
    }
  }
`;
export const deleteSatellite = /* GraphQL */ `
  mutation DeleteSatellite(
    $input: DeleteSatelliteInput!
    $condition: ModelSatelliteConditionInput
  ) {
    deleteSatellite(input: $input, condition: $condition) {
      id
      name {
        value
        override
      }
      launchDate
      launchVehicle
      launchSite
      countryOfLaunchSite {
        value
        override
      }
      countryOfJurisdiction
      contractor
      operator
      purpose {
        value
        override
      }
      satelliteType {
        value
        override
      }
      lifetime
      status {
        value
        override
      }
      orbitalDatum {
        apogee {
          datasource {
            id
            name
          }
          value
        }
        argumentOfPerigee {
          datasource {
            id
            name
          }
          value
        }
        perigree {
          datasource {
            id
            name
          }
          value
        }
        eccentricity {
          datasource {
            id
            name
          }
          value
        }
        inclination {
          datasource {
            id
            name
          }
          value
        }
        longitude {
          datasource {
            id
            name
          }
          value
        }
        meanMotion {
          datasource {
            id
            name
          }
          value
        }
        orbitalPeriod {
          datasource {
            id
            name
          }
          value
        }
        semiMajorAxis {
          datasource {
            id
            name
          }
          value
        }
        driftRate {
          datasource {
            id
            name
          }
          value
        }
      }
      relatedPostIDs
    }
  }
`;
export const createDatasource = /* GraphQL */ `
  mutation CreateDatasource(
    $input: CreateDatasourceInput!
    $condition: ModelDatasourceConditionInput
  ) {
    createDatasource(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const updateDatasource = /* GraphQL */ `
  mutation UpdateDatasource(
    $input: UpdateDatasourceInput!
    $condition: ModelDatasourceConditionInput
  ) {
    updateDatasource(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const deleteDatasource = /* GraphQL */ `
  mutation DeleteDatasource(
    $input: DeleteDatasourceInput!
    $condition: ModelDatasourceConditionInput
  ) {
    deleteDatasource(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const createEventType = /* GraphQL */ `
  mutation CreateEventType(
    $input: CreateEventTypeInput!
    $condition: ModelEventTypeConditionInput
  ) {
    createEventType(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const updateEventType = /* GraphQL */ `
  mutation UpdateEventType(
    $input: UpdateEventTypeInput!
    $condition: ModelEventTypeConditionInput
  ) {
    updateEventType(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const deleteEventType = /* GraphQL */ `
  mutation DeleteEventType(
    $input: DeleteEventTypeInput!
    $condition: ModelEventTypeConditionInput
  ) {
    deleteEventType(input: $input, condition: $condition) {
      id
      name
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      id
      name
      tagType
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      id
      name
      tagType
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      id
      name
      tagType
    }
  }
`;
