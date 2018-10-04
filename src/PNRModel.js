const request = require('request-promise-native');
const FileHelper = require('./FileHelper');
const FlightSearch = require('./SearchCriteria');

function FormatDateTime(when) {
  const dateTimeString = `${when.getFullYear()}-${(when.getMonth() + 1).toString(10).padStart(2, '0')}-${when.getDate().toString(10).padStart(2, '0')}T${when.getHours().toString(10).padStart(2, '0')}:${when.getMinutes().toString(10).padStart(2, '0')}:${when.getSeconds().toString(10).padStart(2, '0')}`;

  return dateTimeString;
}

class CreatePassengerNameRecordModel {
  constructor(params) {
    Object.assign(this, params);
  }

  get bookingInfo() {
    return this.response.CreatePassengerNameRecordRS;
  }

  get pnr() {
    let pnr = 'unknown';

    if (this.bookingInfo.ItineraryRef) {
      pnr = this.bookingInfo.ItineraryRef.ID;
    }
    return pnr;
  }

  get status() {
    return this.bookingInfo.ApplicationResults.status;
  }

  async create() {
    try {
      const response = await request({
        method: 'POST',
        url: `${this.apiEndPoint}/v2.1.0/passenger/records?mode=create`,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.apiAccessToken}`,
        },
        body: this.toBodyString(),
      });

      FileHelper.writeData(response, './CachedResponse.json');
      this.response = JSON.parse(response);

      return this.response;
    } catch (error) {
      console.log(`Request responded with an error ${error.statusCode}`);
      console.log(JSON.parse(error.error));

      return -1;
    }
  }

  toBodyString() {
    const today = new Date();
    const futureDeparture = new Date();
    const futureArrival = new Date();

    futureDeparture.setDate(today.getDate() + FlightSearch.daysInAdvance);
    futureDeparture.setHours(12, 0);

    futureArrival.setDate(today.getDate() + FlightSearch.daysInAdvance);
    futureArrival.setHours(16, 41);

    const requestPayload = {
      CreatePassengerNameRecordRQ: {
        version: '2.1.0',
        targetCity: this.pcc,
        haltOnAirPriceError: true,
        TravelItineraryAddInfo: {
          AgencyInfo: {
            Address: {
              AddressLine: 'IMAGINARY TRAVEL CORP',
              CityName: 'DALLAS',
              CountryCode: 'US',
              PostalCode: '12345-6789',
              StateCountyProv: {
                StateCode: 'TX',
              },
              StreetNmbr: '1234 MAIN LANE',
            },
            Ticketing: {
              TicketType: '7TAW',
            },
          },
          CustomerInfo: {
            ContactNumbers: {
              ContactNumber: [
                {
                  NameNumber: '1.1',
                  Phone: '214-867-5309',
                  PhoneUseType: 'H',
                },
              ],
            },
            CreditCardData: {
              BillingInformation: {
                cardHolderName: 'TEST USER',
                streetAddress: '1234, ANYWHERE DR',
                city: 'NEW YORK',
                stateOrProvince: 'NY',
                PostalCode: '12345-6789',
              },
            },
            PersonName: [
              {
                NameNumber: '1.1',
                NameReference: 'ABC123',
                PassengerType: 'ADT',
                GivenName: 'TEST',
                Surname: 'USER',
              },
            ],
          },
        },
        AirBook: {
          HaltOnStatus: [
            {
              Code: 'HL',
            },
            {
              Code: 'KK',
            },
            {
              Code: 'LL',
            },
            {
              Code: 'NN',
            },
            {
              Code: 'NO',
            },
            {
              Code: 'UC',
            },
            {
              Code: 'US',
            },
          ],
          OriginDestinationInformation: {
            FlightSegment: [
              {
                ArrivalDateTime: FormatDateTime(futureArrival),
                DepartureDateTime: FormatDateTime(futureDeparture),
                FlightNumber: FlightSearch.flightNumber,
                NumberInParty: '1',
                ResBookDesigCode: 'W',
                Status: 'NN',
                InstantPurchase: true,
                DestinationLocation: {
                  LocationCode: FlightSearch.arrival.airportCode,
                },
                MarketingAirline: {
                  Code: FlightSearch.airlineCode,
                  FlightNumber: FlightSearch.flightNumber,
                },
                MarriageGrp: 'O',
                OriginLocation: {
                  LocationCode: FlightSearch.departure.airportCode,
                },
              },
            ],
          },
        },
        AirPrice: [
          {
            PriceComparison: [
              {
                AmountSpecified: 2000,
                AcceptablePriceIncrease: {
                  HaltOnNonAcceptablePrice: false,
                  Amount: 1500,
                },
              },
            ],
            PriceRequestInformation: {
              Retain: true,
              OptionalQualifiers: {
                FOP_Qualifiers: {
                  BasicFOP: {
                    Type: 'CK',
                  },
                },
                PricingQualifiers: {
                  NameSelect: [
                    {
                      NameNumber: '1.1',
                    },
                  ],
                  PassengerType: [
                    {
                      Code: 'ADT',
                      Quantity: '1',
                    },
                  ],
                },
              },
            },
          },
        ],
        SpecialReqDetails: {
          AddRemark: {
            RemarkInfo: {
              FOP_Remark: {
                Type: 'CHECK',
              },
            },
          },
          SpecialService: {
            SpecialServiceInfo: {
              SecureFlight: [
                {
                  SegmentNumber: 'A',
                  PersonName: {
                    DateOfBirth: '2001-01-01',
                    Gender: 'M',
                    NameNumber: '1.1',
                    GivenName: 'TEST',
                    Surname: 'USER',
                  },
                  VendorPrefs: {
                    Airline: {
                      Hosted: false,
                    },
                  },
                },
              ],
              Service: [
                {
                  SSR_Code: 'OTHS',
                  Text: 'CC TEST USER',
                },
              ],
            },
          },
        },
        PostProcessing: {
          RedisplayReservation: true,
          EndTransaction: {
            Source: {
              ReceivedFrom: 'SP TEST',
            },
          },
          PostBookingHKValidation: {
            waitInterval: 100,
            numAttempts: 6,
          },
          WaitForAirlineRecLoc: {
            waitInterval: 100,
            numAttempts: 6,
          },
        },
      },
    };

    return JSON.stringify(requestPayload);
  }
}

module.exports = CreatePassengerNameRecordModel;
