/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePostSatellite = /* GraphQL */ `
  subscription OnCreatePostSatellite {
    onCreatePostSatellite {
      id
      postID
      satelliteID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      satellite {
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
        posts {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
        orbitalDatum {
          items {
            satelliteID
            createdAt
            argP {
              datasourceID
              value
            }
            ecc {
              datasourceID
              value
            }
            inc {
              datasourceID
              value
            }
            meanAnom {
              datasourceID
              value
            }
            SMA {
              datasourceID
              value
            }
            RAAN {
              datasourceID
              value
            }
            epoch {
              datasourceID
              value
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onUpdatePostSatellite = /* GraphQL */ `
  subscription OnUpdatePostSatellite {
    onUpdatePostSatellite {
      id
      postID
      satelliteID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      satellite {
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
        posts {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
        orbitalDatum {
          items {
            satelliteID
            createdAt
            argP {
              datasourceID
              value
            }
            ecc {
              datasourceID
              value
            }
            inc {
              datasourceID
              value
            }
            meanAnom {
              datasourceID
              value
            }
            SMA {
              datasourceID
              value
            }
            RAAN {
              datasourceID
              value
            }
            epoch {
              datasourceID
              value
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onDeletePostSatellite = /* GraphQL */ `
  subscription OnDeletePostSatellite {
    onDeletePostSatellite {
      id
      postID
      satelliteID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      satellite {
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
        posts {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
        orbitalDatum {
          items {
            satelliteID
            createdAt
            argP {
              datasourceID
              value
            }
            ecc {
              datasourceID
              value
            }
            inc {
              datasourceID
              value
            }
            meanAnom {
              datasourceID
              value
            }
            SMA {
              datasourceID
              value
            }
            RAAN {
              datasourceID
              value
            }
            epoch {
              datasourceID
              value
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onCreatePostTag = /* GraphQL */ `
  subscription OnCreatePostTag {
    onCreatePostTag {
      id
      postID
      tagID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      tag {
        id
        name
        tagType
        posts {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onUpdatePostTag = /* GraphQL */ `
  subscription OnUpdatePostTag {
    onUpdatePostTag {
      id
      postID
      tagID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      tag {
        id
        name
        tagType
        posts {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onDeletePostTag = /* GraphQL */ `
  subscription OnDeletePostTag {
    onDeletePostTag {
      id
      postID
      tagID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      tag {
        id
        name
        tagType
        posts {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onCreatePostEventType = /* GraphQL */ `
  subscription OnCreatePostEventType {
    onCreatePostEventType {
      id
      postID
      eventTypeID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      eventType {
        id
        name
        posts {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onUpdatePostEventType = /* GraphQL */ `
  subscription OnUpdatePostEventType {
    onUpdatePostEventType {
      id
      postID
      eventTypeID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      eventType {
        id
        name
        posts {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const onDeletePostEventType = /* GraphQL */ `
  subscription OnDeletePostEventType {
    onDeletePostEventType {
      id
      postID
      eventTypeID
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      eventType {
        id
        name
        posts {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
      }
    }
  }
`;
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
        eventTypes {
          items {
            id
            postID
            eventTypeID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            eventType {
              id
              name
            }
          }
          nextToken
        }
        tags {
          items {
            id
            postID
            tagID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            tag {
              id
              name
              tagType
            }
          }
          nextToken
        }
        satellites {
          items {
            id
            postID
            satelliteID
            post {
              id
              slug
              title
              postDate
              updatedAt
              excerpt
              featureImageCaption
              relatedPostIDs
              content
            }
            satellite {
              id
              launchDate
              launchVehicle
              launchSite
              countryOfJurisdiction
              contractor
              operator
              lifetime
            }
          }
          nextToken
        }
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
      eventTypes {
        items {
          id
          postID
          eventTypeID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          eventType {
            id
            name
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
      tags {
        items {
          id
          postID
          tagID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          tag {
            id
            name
            tagType
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
      satellites {
        items {
          id
          postID
          satelliteID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          satellite {
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
            posts {
              nextToken
            }
            orbitalDatum {
              nextToken
            }
          }
        }
        nextToken
      }
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
      eventTypes {
        items {
          id
          postID
          eventTypeID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          eventType {
            id
            name
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
      tags {
        items {
          id
          postID
          tagID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          tag {
            id
            name
            tagType
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
      satellites {
        items {
          id
          postID
          satelliteID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          satellite {
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
            posts {
              nextToken
            }
            orbitalDatum {
              nextToken
            }
          }
        }
        nextToken
      }
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
      eventTypes {
        items {
          id
          postID
          eventTypeID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          eventType {
            id
            name
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
      tags {
        items {
          id
          postID
          tagID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          tag {
            id
            name
            tagType
            posts {
              nextToken
            }
          }
        }
        nextToken
      }
      satellites {
        items {
          id
          postID
          satelliteID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          satellite {
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
            posts {
              nextToken
            }
            orbitalDatum {
              nextToken
            }
          }
        }
        nextToken
      }
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
      satelliteID
      createdAt
      argP {
        datasourceID
        value
      }
      ecc {
        datasourceID
        value
      }
      inc {
        datasourceID
        value
      }
      meanAnom {
        datasourceID
        value
      }
      SMA {
        datasourceID
        value
      }
      RAAN {
        datasourceID
        value
      }
      epoch {
        datasourceID
        value
      }
    }
  }
`;
export const onUpdateOrbitalData = /* GraphQL */ `
  subscription OnUpdateOrbitalData {
    onUpdateOrbitalData {
      satelliteID
      createdAt
      argP {
        datasourceID
        value
      }
      ecc {
        datasourceID
        value
      }
      inc {
        datasourceID
        value
      }
      meanAnom {
        datasourceID
        value
      }
      SMA {
        datasourceID
        value
      }
      RAAN {
        datasourceID
        value
      }
      epoch {
        datasourceID
        value
      }
    }
  }
`;
export const onDeleteOrbitalData = /* GraphQL */ `
  subscription OnDeleteOrbitalData {
    onDeleteOrbitalData {
      satelliteID
      createdAt
      argP {
        datasourceID
        value
      }
      ecc {
        datasourceID
        value
      }
      inc {
        datasourceID
        value
      }
      meanAnom {
        datasourceID
        value
      }
      SMA {
        datasourceID
        value
      }
      RAAN {
        datasourceID
        value
      }
      epoch {
        datasourceID
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
      posts {
        items {
          id
          postID
          satelliteID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          satellite {
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
            posts {
              nextToken
            }
            orbitalDatum {
              nextToken
            }
          }
        }
        nextToken
      }
      orbitalDatum {
        items {
          satelliteID
          createdAt
          argP {
            datasourceID
            value
          }
          ecc {
            datasourceID
            value
          }
          inc {
            datasourceID
            value
          }
          meanAnom {
            datasourceID
            value
          }
          SMA {
            datasourceID
            value
          }
          RAAN {
            datasourceID
            value
          }
          epoch {
            datasourceID
            value
          }
        }
        nextToken
      }
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
      posts {
        items {
          id
          postID
          satelliteID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          satellite {
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
            posts {
              nextToken
            }
            orbitalDatum {
              nextToken
            }
          }
        }
        nextToken
      }
      orbitalDatum {
        items {
          satelliteID
          createdAt
          argP {
            datasourceID
            value
          }
          ecc {
            datasourceID
            value
          }
          inc {
            datasourceID
            value
          }
          meanAnom {
            datasourceID
            value
          }
          SMA {
            datasourceID
            value
          }
          RAAN {
            datasourceID
            value
          }
          epoch {
            datasourceID
            value
          }
        }
        nextToken
      }
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
      posts {
        items {
          id
          postID
          satelliteID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          satellite {
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
            posts {
              nextToken
            }
            orbitalDatum {
              nextToken
            }
          }
        }
        nextToken
      }
      orbitalDatum {
        items {
          satelliteID
          createdAt
          argP {
            datasourceID
            value
          }
          ecc {
            datasourceID
            value
          }
          inc {
            datasourceID
            value
          }
          meanAnom {
            datasourceID
            value
          }
          SMA {
            datasourceID
            value
          }
          RAAN {
            datasourceID
            value
          }
          epoch {
            datasourceID
            value
          }
        }
        nextToken
      }
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
      posts {
        items {
          id
          postID
          eventTypeID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          eventType {
            id
            name
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
export const onUpdateEventType = /* GraphQL */ `
  subscription OnUpdateEventType {
    onUpdateEventType {
      id
      name
      posts {
        items {
          id
          postID
          eventTypeID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          eventType {
            id
            name
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
export const onDeleteEventType = /* GraphQL */ `
  subscription OnDeleteEventType {
    onDeleteEventType {
      id
      name
      posts {
        items {
          id
          postID
          eventTypeID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          eventType {
            id
            name
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
      id
      name
      tagType
      posts {
        items {
          id
          postID
          tagID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          tag {
            id
            name
            tagType
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
      id
      name
      tagType
      posts {
        items {
          id
          postID
          tagID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          tag {
            id
            name
            tagType
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
      id
      name
      tagType
      posts {
        items {
          id
          postID
          tagID
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
            eventTypes {
              nextToken
            }
            tags {
              nextToken
            }
            satellites {
              nextToken
            }
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
          tag {
            id
            name
            tagType
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
