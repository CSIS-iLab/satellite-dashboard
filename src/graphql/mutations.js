/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPostSatellite = /* GraphQL */ `
  mutation CreatePostSatellite(
    $input: CreatePostSatelliteInput!
    $condition: ModelPostSatelliteConditionInput
  ) {
    createPostSatellite(input: $input, condition: $condition) {
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
      }
    }
  }
`;
export const updatePostSatellite = /* GraphQL */ `
  mutation UpdatePostSatellite(
    $input: UpdatePostSatelliteInput!
    $condition: ModelPostSatelliteConditionInput
  ) {
    updatePostSatellite(input: $input, condition: $condition) {
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
      }
    }
  }
`;
export const deletePostSatellite = /* GraphQL */ `
  mutation DeletePostSatellite(
    $input: DeletePostSatelliteInput!
    $condition: ModelPostSatelliteConditionInput
  ) {
    deletePostSatellite(input: $input, condition: $condition) {
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
      }
    }
  }
`;
export const createPostTag = /* GraphQL */ `
  mutation CreatePostTag(
    $input: CreatePostTagInput!
    $condition: ModelPostTagConditionInput
  ) {
    createPostTag(input: $input, condition: $condition) {
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
export const updatePostTag = /* GraphQL */ `
  mutation UpdatePostTag(
    $input: UpdatePostTagInput!
    $condition: ModelPostTagConditionInput
  ) {
    updatePostTag(input: $input, condition: $condition) {
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
export const deletePostTag = /* GraphQL */ `
  mutation DeletePostTag(
    $input: DeletePostTagInput!
    $condition: ModelPostTagConditionInput
  ) {
    deletePostTag(input: $input, condition: $condition) {
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
export const createPostEventType = /* GraphQL */ `
  mutation CreatePostEventType(
    $input: CreatePostEventTypeInput!
    $condition: ModelPostEventTypeConditionInput
  ) {
    createPostEventType(input: $input, condition: $condition) {
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
export const updatePostEventType = /* GraphQL */ `
  mutation UpdatePostEventType(
    $input: UpdatePostEventTypeInput!
    $condition: ModelPostEventTypeConditionInput
  ) {
    updatePostEventType(input: $input, condition: $condition) {
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
export const deletePostEventType = /* GraphQL */ `
  mutation DeletePostEventType(
    $input: DeletePostEventTypeInput!
    $condition: ModelPostEventTypeConditionInput
  ) {
    deletePostEventType(input: $input, condition: $condition) {
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
          }
        }
        nextToken
      }
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
          }
        }
        nextToken
      }
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
          }
        }
        nextToken
      }
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
export const updateEventType = /* GraphQL */ `
  mutation UpdateEventType(
    $input: UpdateEventTypeInput!
    $condition: ModelEventTypeConditionInput
  ) {
    updateEventType(input: $input, condition: $condition) {
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
export const deleteEventType = /* GraphQL */ `
  mutation DeleteEventType(
    $input: DeleteEventTypeInput!
    $condition: ModelEventTypeConditionInput
  ) {
    deleteEventType(input: $input, condition: $condition) {
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
