/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePostAuthor = /* GraphQL */ `
  subscription OnCreatePostAuthor {
    onCreatePostAuthor {
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
export const onUpdatePostAuthor = /* GraphQL */ `
  subscription OnUpdatePostAuthor {
    onUpdatePostAuthor {
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
export const onDeletePostAuthor = /* GraphQL */ `
  subscription OnDeletePostAuthor {
    onDeletePostAuthor {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateAuthor = /* GraphQL */ `
  subscription OnCreateAuthor {
    onCreateAuthor {
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
export const onUpdateAuthor = /* GraphQL */ `
  subscription OnUpdateAuthor {
    onUpdateAuthor {
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
export const onDeleteAuthor = /* GraphQL */ `
  subscription OnDeleteAuthor {
    onDeleteAuthor {
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
export const onCreateOrbitalData = /* GraphQL */ `
  subscription OnCreateOrbitalData {
    onCreateOrbitalData {
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
export const onUpdateOrbitalData = /* GraphQL */ `
  subscription OnUpdateOrbitalData {
    onUpdateOrbitalData {
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
export const onDeleteOrbitalData = /* GraphQL */ `
  subscription OnDeleteOrbitalData {
    onDeleteOrbitalData {
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
export const onCreateSatellite = /* GraphQL */ `
  subscription OnCreateSatellite {
    onCreateSatellite {
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
export const onUpdateSatellite = /* GraphQL */ `
  subscription OnUpdateSatellite {
    onUpdateSatellite {
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
export const onDeleteSatellite = /* GraphQL */ `
  subscription OnDeleteSatellite {
    onDeleteSatellite {
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
export const onCreateDatasource = /* GraphQL */ `
  subscription OnCreateDatasource {
    onCreateDatasource {
      id
      name
    }
  }
`;
export const onUpdateDatasource = /* GraphQL */ `
  subscription OnUpdateDatasource {
    onUpdateDatasource {
      id
      name
    }
  }
`;
export const onDeleteDatasource = /* GraphQL */ `
  subscription OnDeleteDatasource {
    onDeleteDatasource {
      id
      name
    }
  }
`;
export const onCreateEventType = /* GraphQL */ `
  subscription OnCreateEventType {
    onCreateEventType {
      id
      name
    }
  }
`;
export const onUpdateEventType = /* GraphQL */ `
  subscription OnUpdateEventType {
    onUpdateEventType {
      id
      name
    }
  }
`;
export const onDeleteEventType = /* GraphQL */ `
  subscription OnDeleteEventType {
    onDeleteEventType {
      id
      name
    }
  }
`;
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
      id
      name
      tagType
    }
  }
`;
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
      id
      name
      tagType
    }
  }
`;
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
      id
      name
      tagType
    }
  }
`;
