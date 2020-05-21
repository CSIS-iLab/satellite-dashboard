/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const postsBySlug = /* GraphQL */ `
  query PostsBySlug(
    $slug: String
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsBySlug(
      slug: $slug
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listAuthors = /* GraphQL */ `
  query ListAuthors(
    $filter: ModelAuthorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuthors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAuthor = /* GraphQL */ `
  query GetAuthor($id: ID!) {
    getAuthor(id: $id) {
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
export const getOrbitalData = /* GraphQL */ `
  query GetOrbitalData($id: ID!) {
    getOrbitalData(id: $id) {
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
export const listOrbitalDatas = /* GraphQL */ `
  query ListOrbitalDatas(
    $filter: ModelOrbitalDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrbitalDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSatellite = /* GraphQL */ `
  query GetSatellite($id: ID!) {
    getSatellite(id: $id) {
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
export const listSatellites = /* GraphQL */ `
  query ListSatellites(
    $filter: ModelSatelliteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSatellites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDatasource = /* GraphQL */ `
  query GetDatasource($id: ID!) {
    getDatasource(id: $id) {
      id
      name
    }
  }
`;
export const listDatasources = /* GraphQL */ `
  query ListDatasources(
    $filter: ModelDatasourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDatasources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const getEventType = /* GraphQL */ `
  query GetEventType($id: ID!) {
    getEventType(id: $id) {
      id
      name
    }
  }
`;
export const listEventTypes = /* GraphQL */ `
  query ListEventTypes(
    $filter: ModelEventTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      name
      tagType
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        tagType
      }
      nextToken
    }
  }
`;
