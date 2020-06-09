/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allSatellitesToday = /* GraphQL */ `
  query allSatellitesToday(
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
        posts {
          items {
            id
            post {
              id
              slug
              title
              postDate
              excerpt
            }
          }
        }
        orbitalDatum(limit: 1, sortDirection: DESC){
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
      nextToken
    }
  }
`;
