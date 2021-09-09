const Guardian = require('../../../transcripts/standard/guardians');
const Address = require('../../../transcripts/standard/address');
const Telephone = require('../../../transcripts/standard/telephones');

function mapAddresses(addresses) {
  if (!addresses)
    return [];

  return addresses.map(({
                          addressTypeDescriptor,
                          streetNumberName,
                          city,
                          stateAbbreviationDescriptor,
                          postalCode,
                          nameOfCounty,
                          apartmentRoomSuiteNumber
                        }) => {
    const address = new Address();
    address.addressType = addressTypeDescriptor;
    address.streetNumberName = !apartmentRoomSuiteNumber ? streetNumberName : `${streetNumberName} ${apartmentRoomSuiteNumber}`;
    address.city = city;
    address.state = stateAbbreviationDescriptor;
    address.postalCode = postalCode;
    address.nameOfCounty = nameOfCounty;

    return address;
  });
}

function mapTelephones(telephones) {
  if (!telephones)
    return [];

  return telephones.map(({
                           telephoneNumber,
                           telephoneNumberTypeDescriptor
                         }) => {
    const telephone = new Telephone();
    telephone.telephoneNumber = telephoneNumber;
    telephone.telephoneNumberType = telephoneNumberTypeDescriptor;

    return telephone;
  });
}


function mapGuardians(guardians) {
  const mappedGuardians = guardians.map(
    ({ relationDescriptor, livesWith, guardianId, firstName, lastSurname, addresses, telephones }) => {
      const guardian = new Guardian();
      guardian.relationToStudent = relationDescriptor;
      guardian.livesWith = livesWith;
      guardian.guardianId = guardianId;
      guardian.firstName = firstName;
      guardian.lastSurname = lastSurname;
      guardian.addresses = mapAddresses(addresses);
      guardian.telephones = mapTelephones(telephones);

      return guardian;
    }
  );

  return mappedGuardians;
}

module.exports = mapGuardians;
